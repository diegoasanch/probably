import React, { useEffect, useState } from 'react'
import {
    H1,
    H3,
    Callout,
    Label,
    NumericInput,
    Spinner,
    Card,
    Tabs,
    Tab,
    Icon,
} from '@blueprintjs/core'
import { PageContainer, Row, Column } from '../layout'
import BinomialTable from '../../components/BinomialTable'

import Result from '../../components/Result'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'react-use'

import { IBarChartItem, IBinomialTable } from '../../types/tables'
import {
    kurtosis,
    createTable,
    expectedValue,
    stdDeviation,
    variance,
    assymetry,
    binomialModel,
    accumulatedLeft,
    accumulatedRight
} from '../../functions/binomials'
import BinomialChart from '../../components/BinomialChart'
import { IOperationType } from '../../types/pages'
import { stringRange } from '../../utils/arrays'
import TeX from '@matejmazur/react-katex'
import styled from 'styled-components'

const StyledCallout = styled(Callout)`
    width: max-content;
    padding: 1.5em;
`


function Binomial() {

    const { t } = useTranslation()

    const NoInput = () => (
        <StyledCallout>
            <H3>
                <span className="bp3-text-muted">
                    <Icon icon="calculator" iconSize={25} />&nbsp;
                </span>
                {t('specify')} <code>n</code> {t('and')} <code>p</code>
            </H3>
        </StyledCallout>
    )
    const NoR = () => (
        <StyledCallout>
            <H3>
                <span className="bp3-text-muted">
                    <Icon icon="calculator" iconSize={25} />&nbsp;
                </span>
                {t('specify')} <code>r</code>
            </H3>
        </StyledCallout>
    )


    // TODO: Set defaults to 0

    const [sampleSize, setSampleSize] = useState<number>(0) // n
    const [successProbability, setSuccessProbability] = useState<number>(0) // p
    const [successFound, setSuccessFound] = useState<number>(NaN) // r
    const [validInput, setValidInput] = useState<boolean>(false)

    const [roundPrecision, setRoundPrecision] = useState<number>(5)

    const [tableData, setTableData] = useState<IBinomialTable | undefined>(undefined)
    const [probabilities, setProbabilities] = useState<IBarChartItem[] | undefined>(([ {label: '', value: 0} ]) as IBarChartItem[])

    const [dataFrom, setDataFrom] = useState<number>(0)
    const [dataTo, setDataTo] = useState<number>(0)
    const [highlight, setHighlight] = useState<string | string[]>('')

    const [punctualProbability, setPunctualProbability] = useState<number>(0)
    const [accumLeft, setAccumLeft] = useState<number>(0)
    const [accumRight, setAccumRight] = useState<number>(0)
    const [opType, setOpType] = useState<IOperationType>('p')

    const handleSampleSize = (valueNum: number, valueStr: string ) => {
        setSampleSize(parseFloat(valueStr) ?? 0)
    }
    const handleSuccessProb = (valueNum: number, valueStr: string ) => {
        setSuccessProbability(parseFloat(valueStr) ?? 0)
    }
    const handleSuccessFound = (valueNum: number, valueStr: string ) => {
        setSuccessFound(parseFloat(valueStr) ?? 0)
    }
    const handleTab = (tab: IOperationType) => {
        setOpType(tab)
    }

    const handleHighlight = (tab: IOperationType, r: number, n: number) => {
        let hl: string | string[]

        if (tab === 'f')
            hl = stringRange(0, r)
        else if (tab === 'g')
            hl = stringRange(r, n)
        else
            hl = String(r)

        setHighlight(hl)
    }

    const handleType = (r: number, n: number, p: number) => {
        setPunctualProbability(binomialModel(r, n, p))
        setAccumLeft(accumulatedLeft(r, n, p))
        setAccumRight(accumulatedRight(r, n, p))
    }

    // For the calculations
    useDebounce(() => {
        handleType( successFound, sampleSize, successProbability)
    }, 200, [sampleSize, successProbability, successFound])

    useEffect(() => {
        handleHighlight(opType, successFound, dataTo)
    }, [successFound, dataTo, opType])

    // for rendering the loaders
    useEffect(() => {
        setTableData(undefined)
        setProbabilities(undefined)
    }, [sampleSize, successProbability])

    // Debouncing the calculations
    useDebounce(() => {
        const newTable = createTable(sampleSize, successProbability)
        const probs_from_table = newTable.content.map(item => ({
            label: String(item[0]),
            value: item[1],
        }))
        setTableData(newTable)
        setProbabilities(probs_from_table)
        setDataTo(sampleSize)
        // console.table(probs_from_table)

    }, 300, [sampleSize, successProbability])

    useEffect(() => {
        const valid = !!(sampleSize && successProbability)
        setValidInput(valid)
        console.log({ valid, sampleSize, successProbability})
    }, [sampleSize, successProbability])

    return (
        <PageContainer>
            <Row>
                <Column>
                    <H1>Input</H1>
                    <Row noPad>
                        <Column margin=".8em 1em" noGrow >
                            <Label>
                                <code>n</code> = {t('sample-size')}
                                <NumericInput
                                    min={1}
                                    onValueChange={handleSampleSize}
                                    minorStepSize={0.0001}
                                    placeholder="n"
                                />
                            </Label>
                            <Label>
                                <code>p</code> = {t('success-prob')}
                                <NumericInput
                                    min={0}
                                    max={1}
                                    stepSize={0.1}
                                    onValueChange={handleSuccessProb}
                                    placeholder="p"
                                />
                            </Label>
                            <Label>
                                <code>r</code> = {t('success-found')}
                                <NumericInput
                                    min={0}
                                    onValueChange={handleSuccessFound}
                                    max={sampleSize}
                                    placeholder="r"
                                />
                            </Label>
                        </Column>
                        <Column margin=".8em 1em" noGrow >
                            <Label>
                                {t('round-precision')} <code> (0.xf)</code>
                                <NumericInput
                                    min={0}
                                    onValueChange={setRoundPrecision}
                                    value={roundPrecision ?? 'x'}
                                    placeholder="x"
                                />
                            </Label>
                            <Card>
                                <Tabs id="operation" onChange={handleTab}>
                                    <Tab
                                        title={<TeX math="P(r)" />}
                                        id="p"
                                        panel={
                                            isNaN(successFound) ?
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
                                            <Result
                                                name="P(\text{V.A.} \leq r)"
                                                result={accumLeft}
                                                precision={roundPrecision}
                                            />
                                        }
                                    />
                                    <Tab
                                        title={<TeX math="G(r)"/>}
                                        id="g"
                                        panel={
                                            <Result
                                                name="P(\text{V.A.} \geq r)"
                                                result={accumRight}
                                                precision={roundPrecision}
                                            />
                                        }
                                    />
                                </Tabs>

                            </Card>
                        </Column>
                        </Row>
                </Column>
                <Column>
                    <H1>{t('analysis')}</H1>
                    { !validInput ?
                        <NoInput />
                      :
                        <>
                            <Result
                                name="E(r) = \mu"
                                result={expectedValue(sampleSize, successProbability)}
                                precision={roundPrecision}
                            />
                            <Result
                                name="V(r) = \sigma^2"
                                result={variance(sampleSize, successProbability)}
                                precision={roundPrecision}
                            />
                            <Result
                                name="D(r) = \sigma"
                                result={stdDeviation(sampleSize, successProbability)}
                                precision={roundPrecision}
                            />
                            <Result
                                name="As = \alpha_3"
                                result={assymetry(sampleSize, successProbability)}
                                precision={roundPrecision}
                            />
                            <Result
                                name="Ku = \alpha_4"
                                result={kurtosis(sampleSize, successProbability)}
                                precision={roundPrecision}
                            />
                        </>
                    }
                </Column>
            </Row>
            <Row>
                <Column width="max-content" noGrow>
                    <H1>{t('table')}</H1>
                    { !validInput ?
                        <NoInput />
                      :
                        (tableData ?
                            <BinomialTable
                                table={tableData}
                                precision={roundPrecision}
                                highlight={highlight}
                            />
                          :
                            <Spinner size={100} />
                        )
                    }
                </Column>
                <Column>
                    <H1>{t('chart')}</H1>
                    { !validInput ?
                        <NoInput />
                      :
                       (probabilities ?
                            <BinomialChart
                                data={probabilities}
                                highlight={highlight}
                                roundPrecision={roundPrecision}
                            />
                        :
                            <Spinner size={100} />
                        )
                     }
                </Column>
            </Row>


        </PageContainer >
    )
}

export default Binomial
