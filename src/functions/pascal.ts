import { ITable, IProbabilities, IResult } from '../types/tables'
import { combinatory } from './general'
import { analysis_labels } from './shared'
import { accumulatedLeft as BinomialAccumulatedLeft } from './binomials'

const probability = (n: number, r: number, p: number): number => {
    const nCr_1 = combinatory(n - 1, r - 1)
    const result = nCr_1 * p ** r * (1 - p) ** (n - r)
    return result
}

const accumulatedLeft = (n: number, r: number, p: number): number => {
    let total = 0

    for (let x = r; x <= n; x++) total += probability(x, r, p)

    return total
}

const accumulatedRight = (
    n: number,
    r: number,
    p: number,
    limit = 40,
): number => {
    return BinomialAccumulatedLeft(r - 1, n - 1, p)
}

const expectedValue = (r: number, p: number): number => {
    return r / p
}

const variance = (r: number, p: number): number => {
    return (r * (1 - p)) / p ** 2
}

const stdDeviation = (r: number, p: number): number => {
    return Math.sqrt(variance(r, p))
}

const assymetry = (r: number, p: number): number => {
    return (2 - p) / Math.sqrt(r * (1 - p))
}

const kurtosis = (r: number, p: number): number => {
    return 3 + (p ** 2 - 6 * p + 6) / (r * (1 - p))
}

const partialLeftExpected = (n: number, r: number, p: number): number => {
    return (r / p) * accumulatedLeft(n + 1, r + 1, p)
}

const createTable = (r: number, p: number, from = 0, to = 60): ITable => {
    const headers = ['n', 'P(n)', 'F(n)', 'G(n)', 'H(n)']
    // const headers = ['r', 'P(r)', 'F(r)', 'G(r)', 'H(r)', 'J(r)']
    const content: number[][] = []

    from = from ?? 0

    for (let n = from; n <= to; n++) {
        content.push([
            n,
            probability(n, r, p),
            accumulatedLeft(n, r, p),
            accumulatedRight(n, r, p),
            partialLeftExpected(n, r, p),
            // partialRightExpected(n, r, p),
        ])
    }
    return { headers, content }
}

const getAnalysis = (
    successFound: number,
    successProbability: number,
): IResult[] => {
    const results: IResult[] = [
        {
            texLabel: analysis_labels.expected,
            value: expectedValue(successFound, successProbability),
        },
        {
            texLabel: analysis_labels.variance,
            value: variance(successFound, successProbability),
        },
        {
            texLabel: analysis_labels.std_dev,
            value: stdDeviation(successFound, successProbability),
        },
        {
            texLabel: analysis_labels.assymetry,
            value: assymetry(successFound, successProbability),
        },
        {
            texLabel: analysis_labels.kurtosis,
            value: kurtosis(successFound, successProbability),
        },
    ]

    return results
}

const getProbabilities = (n: number, r: number, p: number): IProbabilities => {
    const results: IProbabilities = {
        punctual: probability(n, r, p),
        accum_left: accumulatedLeft(n, r, p),
        accum_right: accumulatedRight(n, r, p),
    }
    return results
}

const defaultTable: ITable = {
    headers: ['r', 'P(r)', 'F(r)', 'G(r)', 'H(r)'],
    content: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ],
}

export {
    probability,
    accumulatedLeft,
    accumulatedRight,
    expectedValue,
    stdDeviation,
    assymetry,
    kurtosis,
    partialLeftExpected,
    createTable,
    getAnalysis,
    getProbabilities,
    defaultTable,
}
