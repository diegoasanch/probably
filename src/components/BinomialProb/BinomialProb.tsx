import React, { useContext } from 'react'
import { Card, Tab, Tabs } from '@blueprintjs/core'
import TeX from '@matejmazur/react-katex'
import Result from '../Result'
import { IOperationType } from '../../types/pages'
import { IProbabilities } from '../../types/tables'
import NoR from '../NoInputCards/NoR'
import { PrecisionContext } from '../../contexts/inputs'

type IProps = {
    handleTab: (tab: IOperationType) => void,
    successFound: number,
    validInput: boolean,
    probabilities: IProbabilities | undefined,
}

const BinomialProb = ({
    handleTab,
    successFound,
    validInput,
    probabilities,
}: IProps) => {

    validInput = validInput && !isNaN(successFound)
    const roundPrecision = useContext(PrecisionContext)

    return (
        <Card>
            <Tabs id="operation" onChange={handleTab}>
                <Tab
                    title={<TeX math="P(r)" />}
                    id="p"
                    panel={
                        !validInput ?
                            <NoR />
                        :
                            <Result
                                name={`P(\\text{V.A.} = ${successFound})`}
                                result={probabilities?.punctual}
                                precision={roundPrecision}
                            />
                    }
                />
                <Tab
                    title={<TeX math="F(r)"/>}
                    id="f"
                    panel={
                        !validInput ?
                            <NoR />
                        :
                            <Result
                                name={`P(\\text{V.A.} \\leq ${successFound})`}
                                result={probabilities?.accum_left}
                                precision={roundPrecision}
                            />
                    }
                />
                <Tab
                    title={<TeX math="G(r)"/>}
                    id="g"
                    panel={
                        !validInput ?
                            <NoR />
                        :
                            <Result
                                name={`P(\\text{V.A.} \\geq ${successFound})`}
                                result={probabilities?.accum_right}
                                precision={roundPrecision}
                            />
                    }
                />
            </Tabs>

        </Card>
    )
}

export default BinomialProb
