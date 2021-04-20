import React, { useContext } from 'react'
import { Cell, Column } from '@blueprintjs/table'
import { ITable } from '../../types/tables'
import { isCellHighlight } from '../../utils/determine_style'
import { StyledTable } from './styles'
import { PrecisionContext } from '../../contexts/inputs'

type IProps = {
    table: ITable,
    isLoading: boolean,
    highlight?: string | string[],
}

const BinomialTable = ({ table, highlight, isLoading }: IProps) => {

    const roundPrecision = useContext(PrecisionContext)

    const renderCell = (row: number, col: number) => {
        const intent = isCellHighlight(row, highlight) ? 'primary' : 'none'
        // console.log(`Cell intent: ${intent}`)

        return (
            <Cell intent={intent} loading={isLoading}>
                { table.content[row][col]
                    .toFixed(col ? roundPrecision : 0)
                }
            </Cell>
        )
    }

    // console.table(table.content)

    return (
        <StyledTable
            numRows={table.content.length}
            columnWidths={[35, 75, 75, 75, 75, 75]}
        >
            {table.headers.map((header: string, i: number) => (
                <Column name={header} cellRenderer={row => renderCell(row, i)} />
            ))}
        </StyledTable>
    )
}

export default BinomialTable
