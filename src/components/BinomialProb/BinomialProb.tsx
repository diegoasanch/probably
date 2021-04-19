import React from 'react'
import { Card, H3, Icon, Tab, Tabs } from '@blueprintjs/core'
import TeX from '@matejmazur/react-katex'
import { useTranslation } from 'react-i18next'
import { StyledCallout } from '../../styles/display'
import Result from '../Result'
import { IOperationType } from '../../types/pages'
import { IProbabilities } from '../../types/tables'

const NoR = () => {

    const { t } = useTranslation()

    return (
        <StyledCallout>
            <H3>
                <span className="bp3-text-muted">
                    <Icon icon="calculator" iconSize={25} />&nbsp;
                </span>
                {t('specify')} <code>r</code>
            </H3>
        </StyledCallout>
    )
}

type IProps = {
    handleTab: (tab: IOperationType) => void,
    successFound: number,
    roundPrecision: number,
    validInput: boolean,
    probabilities: IProbabilities | undefined,
}

const BinomialProb = ({
    handleTab,
    successFound,
    validInput,
    roundPrecision,
    probabilities,
}: IProps) => {

    validInput = validInput && !isNaN(successFound)

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
