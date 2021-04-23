import { IOperationType } from "../types/pages";

/**
 * from and to inclusive
 * @param from
 * @param to
 * @param step
 * @returns
 */
const range = (from: number, to: number, step=1): number[] => {
    const length = to - from
    if (length > 0)
        return [...Array(length + 1)].map((_, i) => from + i * step);
    return []
}

const stringRange = (from: number, to: number, step=1): string[] => {
    return range(from, to, step).map(item => String(item))
}

const handleHighlight = (tab: IOperationType, num: number, to: number, from=0): string | string[] => {
    let hl: string | string[]

    if (tab === 'f')
        hl = stringRange(from, num)
    else if (tab === 'g')
        hl = stringRange(num, to)
    else
        hl = String(num)

    return hl
}

export {
    range,
    stringRange,
    handleHighlight,
}
