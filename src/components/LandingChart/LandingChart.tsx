import React, { useContext, useState } from 'react'
import { useInterval } from 'react-use'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer } from 'recharts'
import { ThemeContext } from 'styled-components'
import { createLandingChart } from '../../functions/binomials'
import { IBarChartItem } from '../../types/tables'

const createRandomChart = (prob: number, entries: number): IBarChartItem[] => {

    // console.time('Creating table 📅')
    const chart_data = createLandingChart(entries, prob)
    // console.timeEnd('Creating table 📅')

    return chart_data
}

const INITIAL_PROB = 0.01
const INITIAL_SIZE = 70

type IProps = {
    playAnimation: boolean;
}

const LandingChart = ({ playAnimation }: IProps) => {

    const themeContext = useContext(ThemeContext)
    const [chartData, setChartData] = useState(createRandomChart(INITIAL_PROB, INITIAL_SIZE))
    const [prob, setProb] = useState(INITIAL_PROB)
    const [size, setSize] = useState(INITIAL_SIZE)

    useInterval(() => {
        const new_prob = prob < 0.96 ? (prob + 0.04) : 0.04
        // const new_prob = prob > 0.1 ? (prob - 0.04) : 0.9
        setProb(new_prob)
        setChartData(createRandomChart(new_prob, size))
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
