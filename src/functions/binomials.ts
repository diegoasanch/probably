import { IBinomialTable, IProbabilities, IResults } from "../types/tables"

const factorial = (n: number): number => {
    if (n === 0)
        return 1

    let res = 1
    for (let i = 1; i <= n; i++)
        res *= i
    return res
}

const combinatory = (a: number, b: number): number => {
    if (a === b)
        return 1

    const numerator = factorial(a)
    const denominator = factorial(b) * factorial(a - b)

    return numerator / denominator
}

const binomialModel = (r: number, n: number, p: number): number => {
    const nCr = combinatory(n, r)
    const result = nCr * (p ** r) * ((1 - p) ** (n - r))
    return result
}

const accumulatedLeft = (r: number, n: number, p: number): number => {
    let total = 0

    for (let x = 0; x <= r; x++)
        total += binomialModel(x, n, p)

    return total
}

const accumulatedRight = (r: number, n: number, p: number): number => {
    let total = 0

    for (let x = r; x <= n; x++)
        total += binomialModel(x, n, p)

    return total
}

/**
 * "Esperanza matematica" o mu
 * @param n Cantidad de observaciones
 * @param p Probabilidad de exito
 * @returns Esperanza matematica
 */
const expectedValue = (n: number, p: number): number => {
    return n * p
}

const variance = (n: number, p: number): number => {
    return n * p * (1 - p)
}

const stdDeviation = (n: number, p: number): number => {
    return Math.sqrt(variance(n, p))
}

const assymetry = (n: number, p: number): number => {
    return (1 - 2 * p) / Math.sqrt(n * p * (1 - p))
}
const kurtosis = (n: number, p: number): number => {
    return 3 + ((1 - 6 * p * (1 - p)) / (n * p * (1 - p)))
}

const partialLeftExpected = (r: number, n: number, p: number): number => {
    let total = 0
    for (let x = 0; x <= r; x++)
        total += (x * binomialModel(x, n, p))
    return total
}
const partialRightExpected = (r: number, n: number, p: number): number => {
    let total = 0
    for (let x = r; x <= n; x++)
        total += (x * binomialModel(x, n, p))
    return total
}


const createTable = (
    n: number,
    p: number,
    from?: number,
    to?: number,
): IBinomialTable => {

    const headers = ['r', 'P(r)', 'F(r)', 'G(r)', 'H(r)', 'J(r)']
    const content: number[][] = []

    from = from ?? 0
    to = to ?? n

    for (let r = from; r <= to; r++ ) {
        content.push([
            r,
            binomialModel(r, n, p),
            accumulatedLeft(r, n, p),
            accumulatedRight(r, n, p),
            partialLeftExpected(r, n, p),
            partialRightExpected(r, n, p),
        ])
    }
    return {headers, content}
}

const getAnalysis = (sampleSize: number, successProbability: number): IResults  => {
    const results: IResults = {
        expected: expectedValue(sampleSize, successProbability),
        variance: variance(sampleSize, successProbability),
        std_dev: stdDeviation(sampleSize, successProbability),
        assymetry: assymetry(sampleSize, successProbability),
        kurtosis: kurtosis(sampleSize, successProbability),
    }
    return results
}

const getProbabilities = (r: number, n: number, p: number): IProbabilities => {
    const results: IProbabilities = {
        punctual: binomialModel(r, n, p),
        accum_left: accumulatedLeft(r, n, p),
        accum_right: accumulatedRight(r, n, p),
    }
    return results
}

const defaultTable: IBinomialTable = {
    headers: ['r', 'P(r)', 'F(r)', 'G(r)', 'H(r)', 'J(r)'],
    content: [
        [0, 0, 0 ,0, 0, 0], [0, 0, 0 ,0, 0, 0],
        [0, 0, 0 ,0, 0, 0], [0, 0, 0 ,0, 0, 0],
        [0, 0, 0 ,0, 0, 0], [0, 0, 0 ,0, 0, 0],
        [0, 0, 0 ,0, 0, 0], [0, 0, 0 ,0, 0, 0],
        [0, 0, 0 ,0, 0, 0], [0, 0, 0 ,0, 0, 0],
    ]
}

export {
    binomialModel,
    accumulatedLeft,
    accumulatedRight,
    expectedValue,
    variance,
    stdDeviation,
    assymetry,
    kurtosis,
    partialLeftExpected,
    partialRightExpected,
    createTable,
    getAnalysis,
    getProbabilities,
    defaultTable,
}
