import { IProbabilities, IResult, ITable } from "../types/tables"
import { combinatory } from "./general"
import { analysis_labels } from "./shared"

const probability = (r: number, n: number, N: number, R: number): number => {
    const MIN_LIMIT = Math.max(0, n - (N - R))
    const MAX_LIMIT = Math.min(n, R)


    if (r < MIN_LIMIT || r > MAX_LIMIT) {
        // console.log(`Outside limits`, {r, MIN_LIMIT, MAX_LIMIT})
        return 0
    }

    const numerator = combinatory(R, r) * combinatory(N - R, n - r)
    const denominator = combinatory(N, n)

    return numerator / denominator
}

const accumulatedLeft = (r: number, n: number, N: number, R: number): number => {
    let total = 0

    for (let x = 0; x <= r; x++)
        total += probability(x, n, N, R)

    return total
}

const accumulatedRight = (r: number, n: number, N: number, R: number): number => {
    let total = 0

    for (let x = r; x <= n; x++)
        total += probability(x, n, N, R)

    return total
}

const expectedValue = (n: number, N: number, R: number): number => {
    return n * (R / N)
}

const variance = (n: number, N: number, R: number): number => {
    return n * (R / N) * (1 - (R / N)) * ((N-n) / (N-1))
}

const stdDeviation = (n: number, N: number, R: number): number => {
    return Math.sqrt(variance(n, N, R))
}

const assymetry = (n: number, N: number, R: number): number => {
    const numerator = (N-2 * R) * (N-2 * n) * Math.sqrt(N-1)
    const denominator = (N-2) * Math.sqrt(n * R * (N-R) * (N-n))

    return numerator / denominator
}

const kurtosis = (n: number, N: number, R: number): number => {
    // What a hell of a function man
    const part_1 = (N**2 * (N-1)) / (n * R * (N-2) * (N-3) * (N-R) * (N-n) )
    const part_2a = N * (N+1)
    const part_2b = 6 * n * (N-n)
    const part_2c = 3 * (R / N**2) * (N-R) * (N**2 * (n-2) - N * n**2 + 6*n * (N-n))

    return part_1 * (part_2a - part_2b + part_2c)
}

const partialLeftExpected = (r: number, n: number, N: number, R: number): number => {
    return n * (R / N) * accumulatedLeft(r-1, n-1, N-1, R-1)
}

const createTable = (
    n: number,
    N: number,
    R: number,
): ITable => {

    const headers = ['r', 'P(r)', 'F(r)', 'G(r)', 'H(r)']
    // const headers = ['r', 'P(r)', 'F(r)', 'G(r)', 'H(r)', 'J(r)']

    const content: number[][] = []


    for (let r = 0; r <= n; r++ ) {
        content.push([
            r,
            probability(r, n, N, R),
            accumulatedLeft(r, n, N, R),
            accumulatedRight(r, n, N, R),
            partialLeftExpected(r, n, N, R),
            // partialRightExpected(r, n, N, R),
        ])
    }
    return {headers, content}
}

const getAnalysis = (n: number, N: number, R: number): IResult[]  => {
    const results: IResult[] = [
        {
            texLabel: analysis_labels.expected,
            value: expectedValue(n, N, R),
        },
        {
            texLabel: analysis_labels.variance,
            value: variance(n, N, R),
        },
        {
            texLabel: analysis_labels.std_dev,
            value: stdDeviation(n, N, R),
        },
        {
            texLabel: analysis_labels.assymetry,
            value: assymetry(n, N, R),
        },
        {
            texLabel: analysis_labels.kurtosis,
            value: kurtosis(n, N, R),
        },
    ]
    return results
}

const getProbabilities = (r: number, n: number, N: number, R: number): IProbabilities => {
    const results: IProbabilities = {
        punctual: probability(r, n, N, R),
        accum_left: accumulatedLeft(r, n, N, R),
        accum_right: accumulatedRight(r, n, N, R),
    }
    return results
}


const defaultTable: ITable = {
    headers: ['r', 'P(r)', 'F(r)', 'G(r)', 'H(r)'],
    content: [
        [0, 0, 0 ,0, 0], [0, 0, 0 ,0, 0],
        [0, 0, 0 ,0, 0], [0, 0, 0 ,0, 0],
        [0, 0, 0 ,0, 0], [0, 0, 0 ,0, 0],
        [0, 0, 0 ,0, 0], [0, 0, 0 ,0, 0],
        [0, 0, 0 ,0, 0], [0, 0, 0 ,0, 0],
    ]
}


export {
    probability,
    accumulatedLeft,
    accumulatedRight,
    createTable,
    getAnalysis,
    getProbabilities,
    defaultTable,
}
