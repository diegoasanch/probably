import React, { useEffect, useState } from 'react'
import BinomialChart from '../../components/BinomialChart'
import { IOperationType } from '../../types/pages'
import { handleHighlight, stringRange } from '../../utils/arrays'

import PunctualOrAccumulated from '../../components/PunctualOrAccumulated'
import ResultGroup from '../../components/ResultGroup'
import BinomialTable from '../../components/BinomialTable'
import { useDebounce } from 'react-use'

import { IBarChartItem, ITable, IProbabilities, IResult } from '../../types/tables'
import { Spinner } from '@blueprintjs/core'
import PageTemplate from '../PageTemplate'
import { PrecisionContext } from '../../contexts/inputs'

import PascalInput from '../../components/InputGroups/PascalInput'
import {
    createTable,
    defaultTable,
    getAnalysis,
    getProbabilities
} from '../../functions/pascal'
import { defaultResults } from '../../functions/shared'
import { showToast } from '../../utils/toaster'
import NoGreater from '../../components/NoGreater'
import NoNegative from '../../components/NoNegative'

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
    const [probabilities, setProbabilities] = useState<IProbabilities | undefined>()

    const [tableData, setTableData] = useState<ITable | undefined>()
    const [chartData, setChartData] = useState<IBarChartItem[] | undefined>(([ {label: '', value: 0} ]) as IBarChartItem[])

    const [dataFrom, setDataFrom] = useState<number>(0)
    // TODO: fix this disable
    // eslint-disable-next-line
    const [dataTo, setDataTo] = useState(60)
    const [highlight, setHighlight] = useState<string | string[]>('')
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
    }
    const handleTab = (tab: IOperationType) => {
        setOpType(tab)
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
    }, 300, [sampleSize, successProbability, successFound])

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
        const newTable = createTable(successFound, successProbability, dataFrom)
        const analysis = getAnalysis(successFound, successProbability) // TODO: check (1)

        const probs_from_table = newTable.content.map(item => ({
            label: String(item[0]),
            value: item[1],
        }))

        setTableData(newTable)
        setResults(analysis)   // TODO: check (1)
        setChartData(probs_from_table)
        setValidResults(true)

    }, 300, [successFound, successProbability])

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
                                handleTab={handleTab}
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
                    <BinomialTable
                        table={tableData || defaultTable}
                        isLoading={!tableData}
                        highlight={highlight}
                    />
                }
                chart={
                    (chartData ?
                        <BinomialChart
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
