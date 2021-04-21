import React, { useContext } from 'react'
import { Card, Divider } from '@blueprintjs/core';
import styled from 'styled-components'
import { PrecisionContext } from '../../contexts/inputs';

const StyledDivider = styled(Divider)`
    margin: .8em 0;
`

type ITooltipProps = {
    active: boolean,
    label: string,
    value: number,
    variable: string,
}

const sanitizeTooltipProps = (props: any): ITooltipProps => {
    let { active, payload, label, variable } = props
    active = !!active

    let value = 0

    if (typeof(label) !== 'string')
        label = String(label)

    if (Array.isArray(payload)) {
        const innerPayload = payload[0]

        if (typeof(innerPayload?.value) === 'number')
            value = innerPayload.value
    }

    return { active, label, value, variable }
}

const ChartTooltip = (props: any) => {

    const { active, label, value, variable } = sanitizeTooltipProps(props)
    const roundPrecision = useContext(PrecisionContext)
    // console.log({ props, variable })

    if (!active)
        return <></>

    return (
        <Card>
            <code>{ variable }</code> = {label}
            <StyledDivider />
            <code>P({label})</code> = {value.toFixed(roundPrecision)}
        </Card>
    )
}
export default ChartTooltip
