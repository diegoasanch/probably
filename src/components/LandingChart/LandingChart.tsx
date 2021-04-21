import React, { useContext, useState } from 'react'
import { useInterval } from 'react-use'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer } from 'recharts'
import { ThemeContext } from 'styled-components'
import { createTable } from '../../functions/binomials'
import { IBarChartItem } from '../../types/tables'

const createRandomChart = (prob: number): IBarChartItem[] => {
    // const found = 5
    const entries = 70

    const results = createTable(entries, prob)
    const chart_data = results.content.map(item => ({
        label: String(item[0]),
        value: item[1],
    }))

    return chart_data
}

const INITIAL_PROB = 0.01

type IProps = {
    playAnimation: boolean;
}

const LandingChart = ({ playAnimation }: IProps) => {

    const themeContext = useContext(ThemeContext)
    const [chartData, setChartData] = useState(createRandomChart(INITIAL_PROB))
    const [prob, setProb] = useState(INITIAL_PROB)

    useInterval(() => {
        const new_prob = prob < 0.96 ? (prob + 0.04) : 0.04
        // const new_prob = prob > 0.1 ? (prob - 0.04) : 0.9
        setProb(new_prob)
        setChartData(createRandomChart(new_prob))
    }, playAnimation ? 800 : null)


    return (
        <ResponsiveContainer>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="2 5" stroke={themeContext.chart_gridColor} />
                <Bar dataKey="value">
                    { chartData.map(( entry, index) => (
                        <Cell key={`cell-${index}`} fill={themeContext.landing_chart} />
                    )) }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default LandingChart
