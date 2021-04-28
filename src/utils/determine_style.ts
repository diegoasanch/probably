import { Highlight } from '../types/tables'
import { inRange } from './numbers'

const isCellHighlight = (
    value: number,
    highlight: Highlight | undefined,
): boolean => {
    let is_highlight = false

    if (highlight) {
        if (highlight.isRange)
            is_highlight = inRange(value, highlight.min, highlight.max)
        else is_highlight = value === highlight.num
    }
    // console.log({ is_highlight, value, highlight })
    return is_highlight
}

export { isCellHighlight }
