import { IOperationType } from '../types/pages'
import { Highlight } from '../types/tables'

/**
 * from and to inclusive
 * @param from
 * @param to
 * @param step
 * @returns
 */
const range = (from: number, to: number, step = 1): number[] => {
    const length = to - from
    if (length > 0) return [...Array(length + 1)].map((_, i) => from + i * step)
    return []
}

const stringRange = (from: number, to: number, step = 1): string[] => {
    return range(from, to, step).map((item) => String(item))
}

const handleHighlight = (
    tab: IOperationType,
    num: number,
    to: number,
    from = 0,
): Highlight => {
    let hl: Highlight = {
        isRange: true,
        num: NaN,
        min: NaN,
        max: NaN,
    }

    if (tab === 'f') {
        hl.min = from
        hl.max = num
    } else if (tab === 'g') {
        hl.min = num
        hl.max = to
    } else {
        hl.isRange = false
        hl.num = num
    }

    return hl
}

/**
 * The first column is the thinnest
 */
const getColumnWidths = (length: number): number[] => {
    return [35].concat(Array(length - 1).fill(75))
}

/**
 * Copies the array and sets the new value to
 * @param prevWidths
 * @param index
 * @param newSize
 * @returns
 */
const getResizedColumns = (
    prevWidths: number[],
    index: number,
    newSize: number,
): number[] => {
    const newArray = [...prevWidths]
    if (index < newArray.length) newArray[index] = newSize
    return newArray
}

export {
    range,
    stringRange,
    handleHighlight,
    getColumnWidths,
    getResizedColumns,
}
