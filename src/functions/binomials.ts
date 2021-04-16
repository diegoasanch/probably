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

export const binomialModel = (r: number, n: number, p: number): number => {
    const nCr = combinatory(n, r)
    const result = nCr * (p ** r) * ((1 - p) ** (n - r))
    return result
}

export const accumulatedLeft = (r: number, n: number, p: number): number => {
    let total = 0

    for (let x = 0; x <= r; x++)
        total += binomialModel(x, n, p)

    return total
}

export const accumulatedRight = (r: number, n: number, p: number): number => {
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
export const expectedValue = (n: number, p: number): number => {
    return n * p
}

export const variance = (n: number, p: number): number => {
    return n * p * (1 - p)
}

export const stdDeviation = (n: number, p: number): number => {
    return Math.sqrt(variance(n, p))
}

export const kurtosis = (n: number, p: number): number => {
    return 3 + ((1 - 6 * p * (1 - p)) / (n * p * (1 - p)))
}

export const partialLeftExpected = (r: number, n: number, p: number): number => {
    let total = 0
    for (let x = 0; x <= r; x++)
        total += (x * binomialModel(x, n, p))
    return total
}
export const partialRightExpected = (r: number, n: number, p: number): number => {
    let total = 0
    for (let x = r; x <= n; x++)
        total += (x * binomialModel(x, n, p))
    return total
}
