import React from 'react'
import { IResults } from '../../types/tables'
import Result from '../Result/Result'

type IProps = {
    results: IResults | undefined,
    precision: number,
}

const ResultGroup = ({ results, precision }: IProps) => {
    return (
        <>
            <Result
                name="E(r) = \mu"
                result={results?.expected}
                precision={precision}
            />
            <Result
                name="V(r) = \sigma^2"
                result={results?.variance}
                precision={precision}
            />
            <Result
                name="D(r) = \sigma"
                result={results?.std_dev}
                precision={precision}
            />
            <Result
                name="As = \alpha_3"
                result={results?.assymetry}
                precision={precision}
            />
            <Result
                name="Ku = \alpha_4"
                result={results?.kurtosis}
                precision={precision}
            />
    </>
    )
}

export default ResultGroup
