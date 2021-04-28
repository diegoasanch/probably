import { IProbabilities, IResult, ITable } from '../types/tables'
import { combinatory } from './general'
import { analysis_labels } from './shared'

const probability = (n: number, r: number, N: number, R: number): number => {
    if (n < r || n > N - R + r)
        // variable outside domain
        return 0

    const numerator = combinatory(N - n, R - r) * combinatory(n - 1, r - 1)
    const denominator = combinatory(N, R)

    return numerator / denominator
}

const accumulatedLeft = (
    n: number,
    r: number,
    N: number,
    R: number,
): number => {
    let total = 0

    for (let x = r; x <= n; x++) total += probability(x, r, N, R)

    return total
}

const accumulatedRight = (
    n: number,
    r: number,
    N: number,
    R: number,
): number => {
    let total = 0

    for (let x = n; x <= N - R + r; x++) total += probability(x, r, N, R)

    return total
}

const expectedValue = (r: number, N: number, R: number): number => {
    return (r * (N + 1)) / (R + 1)
}

const variance = (r: number, N: number, R: number): number => {
    const mu = expectedValue(r, N, R)
    const middle_expr = ((r + 1) * (N + 2)) / (R + 2) - 1

    return mu * middle_expr - mu ** 2
}

const stdDeviation = (r: number, N: number, R: number): number => {
    return Math.sqrt(variance(r, N, R))
}

const partialLeftExpected = (
    n: number,
    r: number,
    N: number,
    R: number,
): number => {
    return (
        ((r * (N + 1)) / (R + 1)) * accumulatedLeft(n + 1, r + 1, N + 1, R + 1)
    )
}

const createTable = (r: number, N: number, R: number): ITable => {
    const headers = ['n', 'P(n)', 'F(n)', 'G(n)', 'H(n)']
    // const headers = ['r', 'P(r)', 'F(r)', 'G(r)', 'H(r)', 'J(r)']

    const content: number[][] = []

    let prob: number
    let accL: number
    let accR: number
    let expe: number

    for (let n = 0; n <= N; n++) {
        prob = probability(n, r, N, R)
        accL = accumulatedLeft(n, r, N, R)
        accR = accumulatedRight(n, r, N, R)
        expe = partialLeftExpected(n, r, N, R)
        content.push([
            n,
            prob,
            accL,
            accR,
            expe,
            // probability(n, r, N, R),
            // accumulatedLeft(n, r, N, R),
            // accumulatedRight(n, r, N, R),
            // partialLeftExpected(n, r, N, R),
            // partialRightExpected(n, r, N, R),
        ])
    }
    return { headers, content }
}

const getAnalysis = (r: number, N: number, R: number): IResult[] => {
    const results: IResult[] = [
        {
            texLabel: analysis_labels.expected,
            value: expectedValue(r, N, R),
        },
        {
            texLabel: analysis_labels.variance,
            value: variance(r, N, R),
        },
        {
            texLabel: analysis_labels.std_dev,
            value: stdDeviation(r, N, R),
        },
    ]
    return results
}

const getProbabilities = (
    n: number,
    r: number,
    N: number,
    R: number,
): IProbabilities => {
    const results: IProbabilities = {
        punctual: probability(n, r, N, R),
        accum_left: accumulatedLeft(n, r, N, R),
        accum_right: accumulatedRight(n, r, N, R),
    }
    return results
}

const defaultTable: ITable = {
    headers: ['n', 'P(n)', 'F(n)', 'G(n)', 'H(n)'],
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
    expectedValue,
    variance,
    stdDeviation,
    createTable,
    getAnalysis,
    getProbabilities,
    defaultTable,
}
