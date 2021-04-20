import React, { useEffect, useState } from 'react'
import BinomialChart from '../../components/BinomialChart'
import { IOperationType } from '../../types/pages'
import { stringRange } from '../../utils/arrays'

import BinomialProb from '../../components/BinomialProb'
import ResultGroup from '../../components/ResultGroup'
import BinomialTable from '../../components/BinomialTable'
import { useDebounce } from 'react-use'

import { IBarChartItem, ITable, IProbabilities, IResult } from '../../types/tables'
import { Spinner } from '@blueprintjs/core'
import PageTemplate from '../PageTemplate'
import { PrecisionContext } from '../../contexts/inputs'

import BinomialInput from '../../components/BinomialInput'
import {
    createTable,
    defaultResults,
    defaultTable,
    getAnalysis,
    getProbabilities
} from '../../functions/binomials'

function Binomial() {

    const [sampleSize, setSampleSize] = useState(0) // n
    const [successProbability, setSuccessProbability] = useState(0) // p
    const [successFound, setSuccessFound] = useState<number>(NaN) // r
    const [validInput, setValidInput] = useState(false)

    const [roundPrecision, setRoundPrecision] = useState(5)
    const [results, setResults] = useState<IResult[]>(defaultResults)
    const [validResults, setValidResults] = useState(false)
    const [probabilities, setProbabilities] = useState<IProbabilities | undefined>()

    const [tableData, setTableData] = useState<ITable | undefined>()
    const [chartData, setChartData] = useState<IBarChartItem[] | undefined>(([ {label: '', value: 0} ]) as IBarChartItem[])

    // const [dataFrom, setDataFrom] = useState<number>(0)
    const [dataTo, setDataTo] = useState(0)
    const [highlight, setHighlight] = useState<string | string[]>('')
    const [opType, setOpType] = useState<IOperationType>('p')

    const handleSampleSize = (valueNum: number, valueStr: string ) => {
        setSampleSize(parseFloat(valueStr) ?? 0)
    }
    const handleSuccessProb = (valueNum: number, valueStr: string ) => {
        setSuccessProbability(parseFloat(valueStr) ?? 0)
    }
    const handleSuccessFound = (valueNum: number, valueStr: string ) => {
        setSuccessFound(parseFloat(valueStr) ?? 0)
        setProbabilities(undefined)
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
        setProbabilities(getProbabilities(r, n, p))
    }

    // For the calculations
    useDebounce(() => {
        handleType( successFound, sampleSize, successProbability)
    }, 300, [sampleSize, successProbability, successFound])

    useEffect(() => {
        handleHighlight(opType, successFound, dataTo)
    }, [successFound, dataTo, opType])

    // for rendering the loaders
    useEffect(() => {
        setTableData(undefined)
        setChartData(undefined)
        setResults(defaultResults)
        setValidResults(false)
    }, [sampleSize, successProbability])

    // Debouncing the calculations
    useDebounce(() => {
        const newTable = createTable(sampleSize, successProbability)
        const analysis = getAnalysis(sampleSize, successProbability)

        const probs_from_table = newTable.content.map(item => ({
            label: String(item[0]),
            value: item[1],
        }))

        setTableData(newTable)
        setChartData(probs_from_table)
        setDataTo(sampleSize)
        setResults(analysis)
        setValidResults(true)

        // console.table(probs_from_table)

    }, 300, [sampleSize, successProbability])

    useEffect(() => {
        const valid = !!(sampleSize && successProbability)
        setValidInput(valid)
        // console.log({ valid, sampleSize, successProbability})
    }, [sampleSize, successProbability])

    return (
        <PrecisionContext.Provider value={roundPrecision}>
            <PageTemplate
                validInput={validInput}
                input={
                    <BinomialInput
                        handleSampleSize={handleSampleSize}
                        handleSuccessProb={handleSuccessProb}
                        handleSuccessFound={handleSuccessFound}
                        setRoundPrecision={setRoundPrecision}
                        sampleSize={sampleSize}
                        extraPanel={
                            <BinomialProb
                                handleTab={handleTab}
                                successFound={successFound}
                                validInput={validInput}
                                probabilities={probabilities}
                            />
                        }
                    />
                }
                analysis={
                    <ResultGroup
                        validResults={validResults}
                        results={results}
                    /> }
                table={
                    <BinomialTable
                        table={tableData || defaultTable}
                        isLoading={!tableData}
                        highlight={highlight}
                    />
                }
                chart={
                    (chartData ?
                        <BinomialChart
                            data={chartData}
                            highlight={highlight}
                        />
                    :
                        <Spinner size={100} />
                    )
                }
            />
        </PrecisionContext.Provider>
    )
}

export default Binomial
