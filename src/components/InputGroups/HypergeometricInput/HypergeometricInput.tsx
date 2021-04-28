import { Label, NumericInput } from '@blueprintjs/core'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { PrecisionContext } from '../../../contexts/inputs'
import { Column, Row } from '../../../pages/layout'

type StateSetter = (value: React.SetStateAction<number>) => void

type IProps = {
    handleTotalSize: StateSetter
    handleTotalSuccess: StateSetter
    handleSampleSize: StateSetter
    handleSuccessFound: StateSetter
    setRoundPrecision: (value: number) => void
    extraPanel?: JSX.Element
}

const PascalInput = ({
    handleSampleSize,
    handleTotalSize,
    handleTotalSuccess,
    handleSuccessFound,
    setRoundPrecision,
    extraPanel,
}: IProps) => {
    const { t } = useTranslation()
    const roundPrecision = useContext(PrecisionContext)

    const handleNaNs = (numVal: number, strVal: string): void => {
        if (!strVal) numVal = NaN
        handleSuccessFound(numVal)
    }

    return (
        <Row noPad>
            <Column margin=".8em 1em" noGrow>
                <Label>
                    <code>N</code> = {t('population-size')}
                    <NumericInput
                        min={0}
                        stepSize={1}
                        onValueChange={handleTotalSize}
                        placeholder="N"
                    />
                </Label>
                <Label>
                    <code>R</code> = {t('total-success')}
                    <NumericInput
                        min={0}
                        stepSize={1}
                        onValueChange={handleTotalSuccess}
                        placeholder="N"
                    />
                </Label>
                <Label>
                    <code>n</code> = {t('sample-size')}
                    <NumericInput
                        min={1}
                        onValueChange={handleSampleSize}
                        minorStepSize={1}
                        placeholder="n"
                    />
                </Label>
                <Label>
                    <code>r</code> = {t('success-found')}
                    <NumericInput
                        min={0}
                        onValueChange={handleNaNs}
                        placeholder="r"
                    />
                </Label>
            </Column>
            <Column margin=".8em 1em" noGrow>
                <Label>
                    {t('round-precision')} <code> (0.xf)</code>
                    <NumericInput
                        min={0}
                        onValueChange={setRoundPrecision}
                        value={roundPrecision ?? 'x'}
                        placeholder="x"
                    />
                </Label>
                {extraPanel}
            </Column>
        </Row>
    )
}

export default PascalInput
