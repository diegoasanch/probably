import React, { useEffect, useState } from 'react'
import BinomialChart from '../../components/BinomialChart'
import { IOperationType } from '../../types/pages'
import { handleHighlight } from '../../utils/arrays'

import PunctualOrAccumulated from '../../components/PunctualOrAccumulated'
import ResultGroup from '../../components/ResultGroup'
import BinomialTable from '../../components/BinomialTable'
import { useDebounce } from 'react-use'

import { IBarChartItem, ITable, IProbabilities, IResult } from '../../types/tables'
import { Spinner } from '@blueprintjs/core'
import PageTemplate from '../PageTemplate'
import { PrecisionContext } from '../../contexts/inputs'

import BinomialInput from '../../components/InputGroups/BinomialInput'
import {
    createTable,
    defaultTable,
    getAnalysis,
    getProbabilities
} from '../../functions/binomials'
import { defaultResults } from '../../functions/shared'
import { showToast } from '../../utils/toaster'
import NoGreater from '../../components/NoGreater'
import NoNegative from '../../components/NoNegative'

const validateInput = (n: number, p: number, r: number): void => {
    if (r > n)
        showToast(<NoGreater a='r' b='n' />, 'danger')
    if (p > 1)
        showToast(<NoGreater a='p' b='1' />, 'danger')
    if ([n, r, p].some(item => item < 0))
        showToast(<NoNegative />, 'danger')
}

function Binomial() {

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

    // const [dataFrom, setDataFrom] = useState<number>(0)
    const [dataTo, setDataTo] = useState(0)
    const [highlight, setHighlight] = useState<string | string[]>('')
    const [opType, setOpType] = useState<IOperationType>('p')

    const handleSuccessProb = (valueNum: number, valueStr: string ) => {
        setSuccessProbability(parseFloat(valueStr))
    }
    const handleType = (r: number, n: number, p: number) => {
        setProbabilities(getProbabilities(r, n, p))
    }

    // for the punctual probs  loader
    useEffect(() => {
        setProbabilities(undefined)
        validateInput(sampleSize, successProbability, successFound)
    }, [sampleSize, successProbability, successFound])

    // For the calculations
    useDebounce(() => {
        handleType( successFound, sampleSize, successProbability)
    }, 300, [sampleSize, successProbability, successFound])

    useEffect(() => {
        const toHighlight = handleHighlight(opType, successFound, dataTo)
        setHighlight(toHighlight)
    }, [successFound, dataTo, opType])

    // for rendering the loaders
    useEffect(() => {
        setTableData(undefined)
        setChartData(undefined)
        setResults(defaultResults)
        setValidResults(false)

        const valid = !!(sampleSize && successProbability)
        setValidInput(valid)
        setProbabilities(undefined)
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

    }, 300, [sampleSize, successProbability])

    return (
        <PrecisionContext.Provider value={roundPrecision}>
            <PageTemplate
                noInputs={{ a: 'n', b: 'p'}}
                validInput={validInput}
                input={
                    <BinomialInput
                        handleSampleSize={setSampleSize}
                        handleSuccessProb={handleSuccessProb}
                        handleSuccessFound={setSuccessFound}
                        setRoundPrecision={setRoundPrecision}
                        extraPanel={
                            <PunctualOrAccumulated
                                handleTab={setOpType}
                                variable={successFound}
                                validInput={validInput}
                                probabilities={probabilities}
                                varLabel="r"
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
                            variable="r"
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
