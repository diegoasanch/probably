import React, { useEffect, useState } from 'react'
import ProbabilityChart from '../../components/ProbabilityChart'
import { IOperationType } from '../../types/pages'
import { handleHighlight } from '../../utils/arrays'

import PunctualOrAccumulated from '../../components/PunctualOrAccumulated'
import ResultGroup from '../../components/ResultGroup'
import ProbabilityTable from '../../components/ProbabilityTable'
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

// TODO: Fix the bug170  ------------------------
import { useTranslation } from 'react-i18next'
import SvgIcon from '../../components/SvgIcon'
import bug from '../../svg/bug.svg'

const TemporaryWarning170 = () => {
    const { t } = useTranslation()

    return (
        <span>
            {t('bug170-pre')} <code>n &gt; 170</code> {t('bug170-post') + ' '}
            <a
                href="https://github.com/diegoasanch/probably/issues/6"
                target="_blank"
                rel="noopener noreferrer"
            >
                bug.
                <SvgIcon src={bug} name="bug" height="2em" />
            </a>

        </span>
    )
}
//! end TODO: Fix the bug170 ---------------------

const validateInput = (n: number, p: number, r: number): void => {
    if (n > 170)
        showToast(<TemporaryWarning170 />, 'danger')
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
    const [validAnalysis, setValidAnalysis] = useState(false) // TODO: Fix this
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
        setProbabilities(undefined)

        // TODO: Also remove the <= 170 limit from bug170
        const valid = !!(sampleSize && successProbability)
        setValidInput(valid &&  (sampleSize <= 170))
        setValidAnalysis(valid) // TODO: fix
    }, [sampleSize, successProbability])

    // Debouncing the calculations
    useDebounce(() => {

        if (validAnalysis) {
            console.time('Analysis generation ⌚')
            const analysis = getAnalysis(sampleSize, successProbability)
            console.timeEnd('Analysis generation ⌚')
            setResults(analysis)
        }

        if (validInput) {
            console.time('Table generation ⌚')
            const newTable = createTable(sampleSize, successProbability)
            console.timeEnd('Table generation ⌚')

            // console.time('Analysis generation ⌚')
            // const analysis = getAnalysis(sampleSize, successProbability)
            // console.timeEnd('Analysis generation ⌚')

            console.time('Chart data ⌚')
            const probs_from_table = newTable.content.map(item => ({
                label: String(item[0]),
                value: item[1],
            }))
            console.timeEnd('Chart data ⌚')

            setTableData(newTable)
            setChartData(probs_from_table)
            setDataTo(sampleSize)
            // setResults(analysis)
            setValidResults(true)
        }
    }, 300, [sampleSize, successProbability, validInput, validAnalysis])

    return (
        <PrecisionContext.Provider value={roundPrecision}>
            <PageTemplate
                noInputs={{ a: 'n', b: 'p'}}
                validInput={validInput}
                validAnalysis={validAnalysis}
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
                        validResults={validAnalysis}
                        // validResults={validResults}
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
