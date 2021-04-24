// eslint-disable-next-line
import { preCalculatedFactorials } from "../utils/constants"

const factorial = (n: number): number => {
    if (n === 0)
        return 1
    let res = 1
    for (let i = 1; i <= n; i++)
        res *= i
    return res
}

// const factorial = (n: number): number => {
//     // This quite faster
//     return preCalculatedFactorials[n]
// }

/**
 * `a` choose `b`
 */
const combinatory = (a: number, b: number): number => {
    if (a === b)
        return 1

    const numerator = factorial(a)
    const denominator = factorial(b) * factorial(a - b)

    return numerator / denominator
}

export {
    factorial,
    combinatory,
}
