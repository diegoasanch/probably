import { Label, NumericInput } from '@blueprintjs/core'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { PrecisionContext } from '../../../contexts/inputs'
import { Column, Row } from '../../../pages/layout'

type StateSetter = (valueNum: number, valueStr: string) => void

type IProps = {
    handleSampleSize: StateSetter,
    handleSuccessProb: StateSetter,
    handleSuccessFound: StateSetter,
    setRoundPrecision: (value: number) => void,
    extraPanel?: JSX.Element,
    sampleSize: number,
}

const BinomialInput = ({
    handleSampleSize,
    handleSuccessProb,
    handleSuccessFound,
    setRoundPrecision,
    extraPanel,
    sampleSize,

}: IProps) => {

    const { t } = useTranslation()
    const roundPrecision = useContext(PrecisionContext)

    return (
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
                { extraPanel }
            </Column>
        </Row>
    )
}

export default BinomialInput
