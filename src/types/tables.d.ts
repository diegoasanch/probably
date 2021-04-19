type IBinomialTable = {
    headers: string[],
    content: number[][],
}

type IBarChartItem = {
    label: string,
    value: number,
}

type IResults = {
    expected: number,
    variance: number,
    std_dev: number,
    assymetry: number,
    kurtosis: number
}

type IProbabilities = {
    punctual: number,
    accum_left: number,
    accum_right: number,
}

export {
    IBinomialTable,
    IBarChartItem,
    IResults,
    IProbabilities,
}
