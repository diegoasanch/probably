import React, { useContext } from 'react'
import { Highlight, IBarChartItem } from '../../types/tables'
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts'
import { OverflowContainer } from '../../pages/layout'
import { ThemeContext } from 'styled-components'
import { isCellHighlight } from '../../utils/determine_style'
import ChartTooltip from '../ChartTooltip'

type IProps = {
    data: IBarChartItem[]
    highlight?: Highlight
    variable: string
}

const ProbabilityChart = ({ data, highlight, variable }: IProps) => {
    const themeContext = useContext(ThemeContext)

    const BarColor = (entry: IBarChartItem): string => {
        const is_highlight = isCellHighlight(entry.label, highlight)
        return is_highlight
            ? themeContext.chart_barHighlight
            : themeContext.chart_barNormal
    }

    return (
        <OverflowContainer>
            <BarChart width={450} height={300} data={data}>
                <CartesianGrid strokeDasharray="5" />
                <XAxis dataKey="label" tick={{ fill: themeContext.text }} />
                <YAxis tick={{ fill: themeContext.text }} />
                <Tooltip
                    content={(props: any) => (
                        <ChartTooltip variable={variable} {...props} />
                    )}
                />

                <Bar dataKey="value">
                    {data.map((entry, index) => {
                        const color = BarColor(entry)
                        return <Cell key={`cell-${index}`} fill={color} />
                    })}
                </Bar>
            </BarChart>
        </OverflowContainer>
    )
}

export default ProbabilityChart
