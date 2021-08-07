export type ITable = {
    headers: string[]
    content: number[][]
}

export type IBarChartItem = {
    label: number
    value: number
}

/**
 * Yes, it's `texValue` because it is to be rendered using `KaTeX`
 */
export type IResult = {
    texLabel: string
    value: number
}

export type IProbabilities = {
    punctual: number
    accum_left: number
    accum_right: number
}

/**
 * If if `isRange` is set to `true`, the evaluation will be: `currentNum >= min
 * && currentNum <= max`, else evaluation will be `currentNum === num`
 */
export type Highlight = {
    isRange: boolean
    num: number
    min: number
    max: number
}
