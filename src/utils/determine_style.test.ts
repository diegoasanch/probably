import { Highlight } from '../types/tables'
import { isCellHighlight } from './determine_style'

test('Cell 5 should highlight in range [0, ... , 5]', () => {
    const highL: Highlight = {
        isRange: true,
        num: NaN,
        min: 0,
        max: 5,
    }
    expect(isCellHighlight(5, highL)).toBeTruthy()
})

test('Cell 5 should highlight in exact', () => {
    const highL: Highlight = {
        isRange: false,
        num: 5,
        min: NaN,
        max: NaN,
    }
    expect(isCellHighlight(5, highL)).toBeTruthy()
})
test('Cell 5 should not highlight in range [0, 4]', () => {
    const highL: Highlight = {
        isRange: true,
        num: NaN,
        min: 0,
        max: 4,
    }
    expect(isCellHighlight(5, highL)).toBeFalsy()
})
