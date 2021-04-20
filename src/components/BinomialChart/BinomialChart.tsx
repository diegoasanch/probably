import React, { useContext } from 'react'
import { IBarChartItem } from '../../types/tables'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { OverflowContainer } from '../../pages/layout';
import { ThemeContext } from 'styled-components'
import { isCellHighlight } from '../../utils/determine_style';
import { Card, Divider } from '@blueprintjs/core';

//! ---------------------------- TODO: lint this ----------------------------
import styled from 'styled-components'

type ITooltipProps = {
    active: boolean,
    label: string,
    value: number,
    roundPrecision: number,
}

const sanitizeTooltipProps = (props: any): ITooltipProps => {
    let { active, payload, label, roundPrecision } = props
    active = !!active

    let value = 0

    if (typeof(label) !== 'string')
        label = String(label)

    if (Array.isArray(payload)) {
        const innerPayload = payload[0]

        if (typeof(innerPayload?.value) === 'number')
            value = innerPayload.value
    }
    if (isNaN(parseFloat(roundPrecision)))
        roundPrecision = 4

    return { active, label, value, roundPrecision }
}

const StyledDivider = styled(Divider)`
    margin: .8em 0;
`

const BinomialTooltip = (props: any) => {

    console.log({ props })
    const { active, label, value, roundPrecision } = sanitizeTooltipProps(props)

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

//! ---------------------------- END LINT  ----------------------------

type IProps = {
    data: IBarChartItem[],
    highlight?: string | string[],
    legend?: string,
    roundPrecision?: number,
}

const BinomialChart = ({ data, highlight, legend, roundPrecision }: IProps ) => {

    const themeContext = useContext(ThemeContext)

    const BarColor = (entry: IBarChartItem): string => {
        const is_highlight = isCellHighlight(entry.label, highlight)
        return is_highlight ? themeContext.chart_barHighlight : themeContext.chart_barNormal;
    }

    return (
        <OverflowContainer>
            <BarChart
                width={450}
                height={300}
                data={data}
            >
                <CartesianGrid strokeDasharray="5" />
                <XAxis dataKey="label" tick={{ fill: themeContext.text}} />
                <YAxis tick={{ fill: themeContext.text}} />
                <Tooltip
                    content={(props: any) => <BinomialTooltip {...props} roundPrecision={roundPrecision} />}
                />

                <Bar dataKey="value">
                    { data.map((entry, index) => {
                        const color = BarColor(entry)
                        return <Cell key={`cell-${index}`} fill={color} />
                    })}
                </Bar>
            </BarChart>
        </OverflowContainer>
    )
}

export default BinomialChart
