/**
 * from and to inclusive
 * @param from
 * @param to
 * @param step
 * @returns
 */
const range = (from: number, to: number, step=1): number[] => {
    const length = to - from
    if (length)
        return [...Array(length + 1)].map((_, i) => from + i * step);
    return []
}

const stringRange = (from: number, to: number, step=1): string[] => {
    return range(from, to, step).map(item => String(item))
}

export {
    range,
    stringRange
}
