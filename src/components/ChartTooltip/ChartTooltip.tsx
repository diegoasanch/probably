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
}

const sanitizeTooltipProps = (props: any): ITooltipProps => {
    let { active, payload, label } = props
    active = !!active

    let value = 0

    if (typeof(label) !== 'string')
        label = String(label)

    if (Array.isArray(payload)) {
        const innerPayload = payload[0]

        if (typeof(innerPayload?.value) === 'number')
            value = innerPayload.value
    }

    return { active, label, value }
}


const ChartTooltip = (props: any) => {

    // console.log({ props })
    const { active, label, value } = sanitizeTooltipProps(props)
    const roundPrecision = useContext(PrecisionContext)

    if (!active)
        return <></>

    return (
        <Card>
            <code>r</code> = {label}
            <StyledDivider />
            <code>P({label})</code> = {value.toFixed(roundPrecision)}
        </Card>
    )
}
export default ChartTooltip
