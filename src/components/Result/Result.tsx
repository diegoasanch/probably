import React from 'react'
import { Text } from '@blueprintjs/core'
import styled from 'styled-components'
import TeX from '@matejmazur/react-katex'

const StyledResult = styled(Text)`
    font-size: 1.4em;
    margin: 0.2em;
    margin-left: 0.5em;

    .number {
        font-weight: bold;
        font-size: 1.2em;
        color: ${(props) => props.theme.result};
    }
`

type IProps = {
    name: string
    result: number | undefined
    precision: number
}

/**
 * ## `name` string Will be rendered using [KaTeX](https://katex.org/docs/supported.html)
 * If result is undefined, an animation will be displayed
 */
const Result = ({ name, result, precision = 4 }: IProps) => {
    return (
        <StyledResult>
            <TeX math={name + ' = '} />
            &nbsp;
            <span
                className={
                    `number` +
                    (typeof result === 'undefined' ? ' bp3-skeleton' : '')
                }
            >
                {
                    result // if no result, show skeleton loader animation
                        ? result.toFixed(precision)
                        : '0.000000' // just some placeholder for the skeleton
                }
            </span>
        </StyledResult>
    )
}

export default Result
