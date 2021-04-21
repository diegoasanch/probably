import React, { useContext } from 'react'
import { Card, Tab, Tabs } from '@blueprintjs/core'
import TeX from '@matejmazur/react-katex'
import Result from '../Result'
import { IOperationType } from '../../types/pages'
import { IProbabilities } from '../../types/tables'
import No2 from '../NoInputCards/No2'
import { PrecisionContext } from '../../contexts/inputs'

type IProps = {
    handleTab: (tab: IOperationType) => void,
    variable: number,
    validInput: boolean,
    probabilities: IProbabilities | undefined,
    varLabel: string,
}

const BinomialProb = ({
    handleTab,
    variable,
    validInput,
    probabilities,
    varLabel,
}: IProps) => {

    validInput = validInput && !isNaN(variable)
    const roundPrecision = useContext(PrecisionContext)

    return (
        <Card>
            <Tabs id="operation" onChange={handleTab}>
                <Tab
                    title={<TeX math="P(r)" />}
                    id="p"
                    panel={
                        !validInput ?
                            <No2 a={varLabel} />
                        :
                            <Result
                                name={`P(\\text{V.A.} = ${variable})`}
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
                            <No2 a={varLabel} />
                        :
                            <Result
                                name={`P(\\text{V.A.} \\leq ${variable})`}
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
                            <No2 a={varLabel} />
                        :
                            <Result
                                name={`P(\\text{V.A.} \\geq ${variable})`}
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
