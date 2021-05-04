import { combinations } from 'mathjs'

/**
 * `a` choose `b`. Wrapper for mathjs' combinations function
 */
const combinatory = (a: number, b: number): number => {
    if (isNaN(a) || isNaN(b) || a < b || [a, b].some((item) => item < 0))
        return 0
    return combinations(a, b)
}

export { combinatory }
