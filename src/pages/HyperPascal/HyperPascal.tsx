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

import HyperPascalInput from '../../components/InputGroups/HyperPascalInput'
import {
    createTable,
    defaultTable,
    getAnalysis,
    getProbabilities
} from '../../functions/hyperPascal'
import { defaultResults } from '../../functions/shared'
import { showToast } from '../../utils/toaster'
import NoGreater from '../../components/NoGreater'
import NoNegative from '../../components/NoNegative'
import { INPUT_DEBOUNCE } from '../../utils/constants'

const validateInput = (N: number, R: number, n: number, r: number): void => {

    const MAX_n = N - R + r

    if (R > N)
        showToast(<NoGreater a='R' b='N' />, 'danger')
    if (r > N)
        showToast(<NoGreater a='r' b='N' />, 'danger')
    if (r > R)
        showToast(<NoGreater a='r' b='R' />, 'danger')
    if (r > n)
        showToast(<NoGreater a='r' b='n' />, 'danger')
    if (n > MAX_n)
        showToast(<NoGreater a='n' b={`(N - R + r) = ${MAX_n}`} />, 'danger')
    if ([N, R, n, r].some(item => item < 0))
        showToast(<NoNegative />, 'danger')
}

function HyperPascal() {

    const [totalSize, setTotalSize] = useState(NaN) // N
    const [totalSuccess, setTotalSuccess] = useState(NaN) // R
    const [sampleSize, setSampleSize] = useState(NaN) // n
    const [successFound, setSuccessFound] = useState<number>(NaN) // r

    const [validInput, setValidInput] = useState(false)

    const [roundPrecision, setRoundPrecision] = useState(5)
    const [results, setResults] = useState<IResult[]>(defaultResults)
    const [validResults, setValidResults] = useState(false)
    const [probabilities, setProbabilities] = useState<IProbabilities>()

    const [tableData, setTableData] = useState<ITable>()
    const [chartData, setChartData] = useState<IBarChartItem[]>()

    const [highlight, setHighlight] = useState<Highlight>()
    const [opType, setOpType] = useState<IOperationType>('p')


    const handleType = (n: number, r: number, N: number, R: number) => {
        setProbabilities(getProbabilities(n, r, N, R))
    }

    // For the panel animation
    useEffect(() => {
        setProbabilities(undefined)
        validateInput(totalSize, totalSuccess, sampleSize, successFound)
    }, [totalSize, totalSuccess, sampleSize, successFound])

    // For the  calculations
    useDebounce(() => {
        handleType(sampleSize, successFound, totalSize, totalSuccess)
    }, INPUT_DEBOUNCE, [totalSize, totalSuccess, sampleSize, successFound])

    // For the higlights
    useEffect(() => {
        const toHighlight = handleHighlight(opType, sampleSize, totalSize)
        setHighlight(toHighlight)
    }, [opType, sampleSize, totalSize])

    // for rendering the loaders
    useEffect(() => {
        setTableData(undefined)
        setChartData(undefined)
        setResults(defaultResults)
        setValidResults(false)
        setProbabilities(undefined)

    }, [totalSize, totalSuccess, successFound])

    // Debouncing the table and chart calculations
    useDebounce(() => {

        if (validInput) {
            console.time('Table generation ⌚')
            const newTable = createTable(successFound, totalSize, totalSuccess)
            console.timeEnd('Table generation ⌚')

            console.time('Analysis generation ⌚')
            const analysis = getAnalysis(successFound, totalSize, totalSuccess) // TODO: add J(r) (1)
            console.timeEnd('Analysis generation ⌚')

            console.time('Chart data ⌚')
            const probs_from_table = newTable.content.map(item => ({
                label: item[0],
                value: item[1],
            }))
            console.timeEnd('Chart data ⌚')

            setTableData(newTable)
            setResults(analysis)   // TODO: add J(r) (1)
            setChartData(probs_from_table)
            setValidResults(true)
        }
    }, INPUT_DEBOUNCE, [totalSize, totalSuccess, successFound, validInput])

    useEffect(() => {
        const valid = !!(totalSize && totalSuccess && successFound)
        setValidInput(valid)
    }, [totalSize, totalSuccess, successFound])

    return (
        <PrecisionContext.Provider value={roundPrecision}>
            <PageTemplate
                noInputs={{ a: 'N', b: 'r', c: 'R' }}
                validInput={validInput}
                input={
                    <HyperPascalInput
                        handleTotalSize={setTotalSize} // N
                        handleTotalSuccess={setTotalSuccess} // R
                        handleSampleSize={setSampleSize} // n
                        handleSuccessFound={setSuccessFound} // r
                        setRoundPrecision={setRoundPrecision}

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
                        table={tableData ?? defaultTable}
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

export default HyperPascal
