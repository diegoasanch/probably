import React, { useEffect, useState } from 'react'
import ProbabilityChart from '../../components/ProbabilityChart'
import { IOperationType } from '../../types/pages'
import { handleHighlight } from '../../utils/arrays'

import PunctualOrAccumulated from '../../components/PunctualOrAccumulated'
import ResultGroup from '../../components/ResultGroup'
import ProbabilityTable from '../../components/ProbabilityTable'
import { useDebounce } from 'react-use'

import { IBarChartItem, ITable, IProbabilities, IResult, Highlight } from '../../types/tables'
import { Spinner } from '@blueprintjs/core'
import PageTemplate from '../PageTemplate'
import { PrecisionContext } from '../../contexts/inputs'

import PascalInput from '../../components/InputGroups/PascalInput'
import { defaultResults } from '../../functions/shared'
import { showToast } from '../../utils/toaster'
import NoGreater from '../../components/NoGreater'

import NoNegative from '../../components/NoNegative'
import { INPUT_DEBOUNCE } from '../../utils/constants'
import {
    createTable,
    defaultTable,
    getAnalysis,
    getProbabilities
} from '../../functions/pascal'

const validateInput = (n: number, p: number, r: number): void => {
    if (p > 1)
        showToast(<NoGreater a='p' b='1' />, 'danger')
    if ([n, r, p].some(item => item < 0))
        showToast(<NoNegative />, 'danger')
}

function Pascal() {

    const [sampleSize, setSampleSize] = useState(NaN) // n
    const [successProbability, setSuccessProbability] = useState(NaN) // p
    const [successFound, setSuccessFound] = useState<number>(NaN) // r
    const [validInput, setValidInput] = useState(false)

    const [roundPrecision, setRoundPrecision] = useState(5)
    const [results, setResults] = useState<IResult[]>(defaultResults)
    const [validResults, setValidResults] = useState(false)
    const [probabilities, setProbabilities] = useState<IProbabilities>()

    const [tableData, setTableData] = useState<ITable>()
    const [chartData, setChartData] = useState<IBarChartItem[]>()

    const [dataFrom, setDataFrom] = useState<number>(0)
    const [dataTo, setDataTo] = useState(60)
    const [highlight, setHighlight] = useState<Highlight>()
    const [opType, setOpType] = useState<IOperationType>('p')

    const handleSampleSize = (valueNum: number, valueStr: string ) => {
        setSampleSize(valueNum)
        setProbabilities(undefined)
    }
    const handleSuccessProb = (valueNum: number, valueStr: string ) => {
        setSuccessProbability(parseFloat(valueStr) ?? 0)
    }
    const handleSuccessFound = (valueNum: number, valueStr: string ) => {
        const value = parseFloat(valueStr) ?? 0
        setSuccessFound(value)
        setDataFrom(value)
        setDataTo(value + 80)
    }
    const handleType = (r: number, n: number, p: number) => {
        setProbabilities(getProbabilities(n, r, p))
    }

    useEffect(() => {
        validateInput(sampleSize, successProbability, successFound)
    }, [sampleSize, successProbability, successFound])

    // For the  calculations
    useDebounce(() => {
        handleType( successFound, sampleSize, successProbability)
    }, INPUT_DEBOUNCE, [sampleSize, successProbability, successFound])

    // For the higlights
    useEffect(() => {
        const toHighlight = handleHighlight(opType, sampleSize, dataTo, dataFrom)
        setHighlight(toHighlight)
    }, [sampleSize, opType, dataTo, dataFrom])

    // for rendering the loaders
    useEffect(() => {
        setTableData(undefined)
        setChartData(undefined)
        setResults(defaultResults)
        setValidResults(false)
        setProbabilities(undefined)

    }, [successFound, successProbability])

    // Debouncing the table and chart calculations
    useDebounce(() => {
        if (validInput) {
            console.time('Table generation ⌚')
            const newTable = createTable(successFound, successProbability, dataFrom, dataTo)
            console.timeEnd('Table generation ⌚')

            console.time('Analysis generation ⌚')
            const analysis = getAnalysis(successFound, successProbability) // TODO: check (1)
            console.timeEnd('Analysis generation ⌚')

            console.time('Chart data ⌚')
            const probs_from_table = newTable.content.map(item => ({
                label: item[0],
                value: item[1],
            }))
            console.timeEnd('Chart data ⌚')

            setTableData(newTable)
            setResults(analysis)   // TODO: check (1)
            setChartData(probs_from_table)
            setValidResults(true)
        }
    }, INPUT_DEBOUNCE, [successFound, successProbability, validInput])

    useEffect(() => {
        const valid = !!(successFound && successProbability)
        setValidInput(valid)
    }, [successFound, successProbability])

    return (
        <PrecisionContext.Provider value={roundPrecision}>
            <PageTemplate
                noInputs={{ a: 'r', b: 'p' }}
                validInput={validInput}
                input={
                    <PascalInput
                        handleSampleSize={handleSampleSize}
                        handleSuccessProb={handleSuccessProb}
                        handleSuccessFound={handleSuccessFound}
                        setRoundPrecision={setRoundPrecision}
                        sampleSize={sampleSize}
                        extraPanel={
                            <PunctualOrAccumulated
                                handleTab={setOpType}
                                variable={sampleSize}
                                validInput={validInput}
                                probabilities={probabilities}
                                varLabel="n"
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
                    <ProbabilityTable
                        table={tableData || defaultTable}
                        isLoading={!tableData}
                        highlight={highlight}
                    />
                }
                chart={
                    (chartData ?
                        <ProbabilityChart
                            variable="n"
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

export default Pascal
