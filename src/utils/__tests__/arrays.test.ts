import { Highlight } from '../../types/tables'
import {
    getColumnWidths,
    getResizedColumns,
    handleHighlight,
    range,
    stringRange,
} from '../arrays'

test('Number range', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5])
})

test('String range', () => {
    expect(stringRange(0, 5)).toEqual(['0', '1', '2', '3', '4', '5'])
})

test('Highlight handler 1', () => {
    const mockHandler: Highlight = {
        isRange: true,
        num: NaN,
        min: 0,
        max: 5,
    }
    expect(handleHighlight('f', 5, 10)).toEqual(mockHandler)
})
test('Highlight handler 2', () => {
    const mockHandler: Highlight = {
        isRange: true,
        num: NaN,
        min: 5,
        max: 10,
    }
    expect(handleHighlight('g', 5, 10)).toEqual(mockHandler)
})
test('Highlight handler 3', () => {
    const mockHandler: Highlight = {
        isRange: false,
        num: 5,
        min: NaN,
        max: NaN,
    }
    expect(handleHighlight('p', 5, 10)).toEqual(mockHandler)
})

test('Column widths', () => {
    expect(getColumnWidths(5)).toEqual([35, 75, 75, 75, 75])
})

test('Column resize', () => {
    const colSizes = getColumnWidths(5)
    const resized = getResizedColumns(colSizes, 3, 142)
    expect(resized).toEqual([35, 75, 75, 142, 75])
})
