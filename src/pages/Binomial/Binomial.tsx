import React, { useEffect, useState } from 'react'
import ProbabilityChart from '../../components/ProbabilityChart'
import { IOperationType } from '../../types/pages'
import { handleHighlight } from '../../utils/arrays'

import PunctualOrAccumulated from '../../components/PunctualOrAccumulated'
import ResultGroup from '../../components/ResultGroup'
import ProbabilityTable from '../../components/ProbabilityTable'
import { useDebounce } from 'react-use'

import {
    IBarChartItem,
    ITable,
    IProbabilities,
    IResult,
    Highlight,
} from '../../types/tables'
import { Spinner } from '@blueprintjs/core'
import PageTemplate from '../PageTemplate'
import { PrecisionContext } from '../../contexts/inputs'

import { defaultResults } from '../../functions/shared'
import { showToast } from '../../utils/toaster'
import NoGreater from '../../components/NoGreater'
import NoNegative from '../../components/NoNegative'

import BinomialInput from '../../components/InputGroups/BinomialInput'
import {
    createTable,
    defaultTable,
    getAnalysis,
    getProbabilities,
} from '../../functions/binomials'
import { INPUT_DEBOUNCE } from '../../utils/constants'

const validateInput = (n: number, p: number, r: number): void => {
    if (r > n) showToast(<NoGreater a="r" b="n" />, 'danger')
    if (p > 1) showToast(<NoGreater a="p" b="1" />, 'danger')
    if ([n, r, p].some((item) => item < 0)) showToast(<NoNegative />, 'danger')
}

function Binomial() {
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

    // const [dataFrom, setDataFrom] = useState<number>(0)
    const [dataTo, setDataTo] = useState(0)
    const [highlight, setHighlight] = useState<Highlight>()
    const [opType, setOpType] = useState<IOperationType>('p')

    const handleSuccessProb = (valueNum: number, valueStr: string) => {
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
    useDebounce(
        () => {
            handleType(successFound, sampleSize, successProbability)
        },
        INPUT_DEBOUNCE,
        [sampleSize, successProbability, successFound],
    )

    // For the highlight
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
        setProbabilities(undefined)

        const valid = !!(sampleSize && successProbability)
        setValidInput(valid)
    }, [sampleSize, successProbability])

    // Debouncing the calculations
    useDebounce(
        () => {
            if (validInput) {
                console.time('Table generation ⌚')
                const newTable = createTable(sampleSize, successProbability)
                console.timeEnd('Table generation ⌚')

                console.time('Analysis generation ⌚')
                const analysis = getAnalysis(sampleSize, successProbability)
                console.timeEnd('Analysis generation ⌚')

                console.time('Chart data ⌚')
                const probs_from_table = newTable.content.map((item) => ({
                    label: item[0],
                    value: item[1],
                }))
                console.timeEnd('Chart data ⌚')

                setTableData(newTable)
                setChartData(probs_from_table)
                setDataTo(sampleSize)
                setResults(analysis)
                setValidResults(true)
            }
        },
        INPUT_DEBOUNCE,
        [sampleSize, successProbability, validInput],
    )

    return (
        <PrecisionContext.Provider value={roundPrecision}>
            <PageTemplate
                noInputs={{ a: 'n', b: 'p' }}
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
                    />
                }
                table={
                    <ProbabilityTable
                        table={tableData || defaultTable}
                        isLoading={!tableData}
                        highlight={highlight}
                    />
                }
                chart={
                    chartData ? (
                        <ProbabilityChart
                            variable="r"
                            data={chartData}
                            highlight={highlight}
                        />
                    ) : (
                        <Spinner size={100} />
                    )
                }
            />
        </PrecisionContext.Provider>
    )
}

export default Binomial
