import { IResult } from "../types/tables"

const analysis_labels = {
    expected: "E(r) = \\mu",
    variance: "V(r) = \\sigma^2",
    std_dev: "D(r) = \\sigma",
    assymetry: "As = \\alpha_3",
    kurtosis: "Ku = \\alpha_4"
}

const defaultResults: IResult[] = [
    { texLabel: analysis_labels.expected, value: 0 }
]

export {
    analysis_labels,
    defaultResults
}
