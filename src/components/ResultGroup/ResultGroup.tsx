import React, { useContext } from 'react'
import { PrecisionContext } from '../../contexts/inputs'
import { IResult } from '../../types/tables'
import Result from '../Result/Result'

type IProps = {
    results: IResult[],
    validResults: boolean,
}

const ResultGroup = ({ results, validResults }: IProps) => {

    const roundPrecision = useContext(PrecisionContext)

    return (
        <>
            { results.map(( item, index ) => {
                const displayValue = validResults ? item.value : undefined
                return (
                    <Result
                        name={item.texLabel}
                        result={displayValue}
                        precision={roundPrecision}
                        key={`result-${index}`}
                    />
                )
            })}
        </>
    )
}

export default ResultGroup
