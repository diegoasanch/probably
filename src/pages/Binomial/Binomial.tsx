import React, { useEffect, useState } from 'react'
import { H1, Label, NumericInput } from '@blueprintjs/core'
import { InputCol, PageContainer } from '../layout'
import { accumulatedLeft,
    accumulatedRight,
    binomialModel,
    expectedValue,
    kurtosis,
    partialLeftExpected,
    partialRightExpected,
    stdDeviation,
    variance
} from '../../functions/binomials'

function Binomial() {

    // TODO: Set defaults to 0
    const [sampleSize, setSampleSize] = useState<number>(15) // n
    const [successProbability, setSuccessProbability] = useState<number>(0.1) // p
    const [successFound, setSuccessFound] = useState<number>(2) // r
    const [roundPrecision, setRoundPrecision] = useState<number>(5)

    const handleSampleSize = (valueNum: number, valueStr: string ) => {
        setSampleSize(parseFloat(valueStr) ?? 0)
    }
    const handleSuccessProb = (valueNum: number, valueStr: string ) => {
        setSuccessProbability(parseFloat(valueStr) ?? 0)
    }
    const handleSuccessFound = (valueNum: number, valueStr: string ) => {
        setSuccessFound(parseFloat(valueStr) ?? 0)
    }

    return (
        <PageContainer>
            <InputCol>
                <Label>
                    <code>n</code> = Cantidad de observaciones
                    <NumericInput
                        min={1}
                        onValueChange={handleSampleSize}
                        minorStepSize={0.0001}
                        placeholder="n"
                    />
                </Label>
                <Label>
                    <code>p</code> = Probabilidad de éxito
                    <NumericInput
                        min={0}
                        max={1}
                        onValueChange={handleSuccessProb}
                        placeholder="p"
                    />
                </Label>
                <Label>
                    <code>r</code> = Cantidad de éxitos encontrados
                    <NumericInput
                        min={0}
                        onValueChange={handleSuccessFound}
                        placeholder="r"
                    />
                </Label>
            </InputCol>
            <Label>
                Precisión
                <NumericInput
                    min={0}
                    onValueChange={setRoundPrecision}
                    value={roundPrecision}
                    placeholder="precision"
                />
            </Label>
            <H1>P({successFound}) = {binomialModel(successFound, sampleSize, successProbability).toFixed(roundPrecision)}</H1>
            <H1>F({successFound}) = {accumulatedLeft(successFound, sampleSize, successProbability).toFixed(roundPrecision)}</H1>
            <H1>G({successFound}) = {accumulatedRight(successFound, sampleSize, successProbability).toFixed(roundPrecision)}</H1>
            <br />
            <hr />
            <br />
            <hr />
            <br />
            <h1>Mu = {expectedValue(sampleSize, successProbability).toFixed(roundPrecision)}</h1>
            <h1>Variance = {variance(sampleSize, successProbability).toFixed(roundPrecision)}</h1>
            <h1>StdDev = {stdDeviation(sampleSize, successProbability).toFixed(roundPrecision)}</h1>
            <h1>Ku = {kurtosis(sampleSize, successProbability).toFixed(roundPrecision)}</h1>
            <h1>H1 = {partialLeftExpected(successFound, sampleSize, successProbability).toFixed(roundPrecision)}</h1>
            <h1>J1 = {partialRightExpected(successFound, sampleSize, successProbability).toFixed(roundPrecision)}</h1>
        </PageContainer >
    )
}

export default Binomial
