type ITable = {
    headers: string[],
    content: number[][],
}

type IBarChartItem = {
    label: string,
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

export {
    ITable,
    IBarChartItem,
    IResult,
    IProbabilities,
}
