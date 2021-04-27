type ITable = {
    headers: string[],
    content: number[][],
}

type IBarChartItem = {
    label: number,
    value: number,
}

type IResult = {
    texLabel: string,
    value: number,
}

type IProbabilities = {
    punctual: number,
    accum_left: number,
    accum_right: number,
}

/**
 * If if `isRange` is set to `true`, the evaluation will be: `currentNum >= min
 * && currentNum <= max`, else evaluation will be `currentNum === num`
 */
type Highlight = {
    isRange: boolean,
    num: number,
    min: number,
    max: number,
}

export {
    ITable,
    IBarChartItem,
    IResult,
    IProbabilities,
    Highlight,
}
