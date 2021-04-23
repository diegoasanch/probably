import React from 'react'
import { INumericInputProps, NumericInput } from '@blueprintjs/core'
import { evaluate } from 'mathjs'

type HandleInputType = (valueAsNumber: number, valueAsString: string, inputElement: HTMLInputElement | null) => void

const MathInput = ({ min, max, stepSize, onValueChange, placeholder }: INumericInputProps) => {

    const handleInput: HandleInputType = ( numValue: number, strValue: string, inputElement: HTMLInputElement | null ): void => {
        // console.log(`Value as number: ${numValue}, Value as string: ${strValue}`)

        if (onValueChange) {
            let parsedNum: number
            try {
                parsedNum = evaluate(strValue)
            }
            catch (error) {
                console.error('Error parsing input', error)
                parsedNum = 0
            }
            // console.log(`Parsed num: ${parsedNum}, type: ${typeof(parsedNum)}`)
            onValueChange(parsedNum, String(parsedNum), inputElement)
        }
    }

    return (
        <NumericInput
            min={min}
            max={max}
            stepSize={stepSize}
            placeholder={placeholder}
            onValueChange={handleInput}
            allowNumericCharactersOnly={false}
        />
    )
}

export default MathInput
