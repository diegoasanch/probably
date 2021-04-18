import React from 'react'
import { Card, H3, Icon, Tab, Tabs } from '@blueprintjs/core'
import TeX from '@matejmazur/react-katex'
import { useTranslation } from 'react-i18next'
import { StyledCallout } from '../../styles/display'
import Result from '../Result'
import { IOperationType } from '../../types/pages'

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
    punctualProbability: number,
    roundPrecision: number,
    accumLeft: number,
    accumRight: number,
    validInput: boolean,
}

const BinomialProb = ({
    handleTab,
    successFound,
    punctualProbability,
    roundPrecision,
    accumLeft,
    accumRight,
    validInput,
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
                                // name="P(\text{V.A.} = r)"
                                result={punctualProbability}
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
                                result={accumLeft}
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
                                result={accumRight}
                                precision={roundPrecision}
                            />
                    }
                />
            </Tabs>

        </Card>
    )
}

export default BinomialProb
