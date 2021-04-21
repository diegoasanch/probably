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

/**
 * The first column is the thinnest
 */
const getColumnWidths = (length: number) => {
    return [35].concat(Array(length - 1).fill(75))
}

const BinomialTable = ({ table, highlight, isLoading }: IProps) => {

    const roundPrecision = useContext(PrecisionContext)

    const renderCell = (row: number, col: number) => {
        // Determine if higlightable from first value of row
        const intent = isCellHighlight(table.content[row][0], highlight) ? 'primary' : 'none'

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
            columnWidths={getColumnWidths(table.headers.length)}
        >
            {table.headers.map((header: string, i: number) => (
                <Column name={header} cellRenderer={row => renderCell(row, i)} />
            ))}
        </StyledTable>
    )
}

export default BinomialTable
