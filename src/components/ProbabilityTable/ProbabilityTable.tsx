import React, { useContext, useState } from 'react'
import { Cell, Column } from '@blueprintjs/table'
import { Highlight, ITable } from '../../types/tables'
import { isCellHighlight } from '../../utils/determine_style'
import { StyledTable } from './styles'
import { PrecisionContext } from '../../contexts/inputs'
import { getColumnWidths, getResizedColumns } from '../../utils/arrays'

type IProps = {
    table: ITable
    isLoading: boolean
    highlight?: Highlight
}

const ProbabilityTable = ({ table, highlight, isLoading }: IProps) => {
    const roundPrecision = useContext(PrecisionContext)
    const [colWidths, setColWidths] = useState<number[]>(
        getColumnWidths(table.headers.length),
    )

    const handleResize = (index: number, newSize: number) => {
        setColWidths(getResizedColumns(colWidths, index, newSize))
    }

    const renderCell = (row: number, col: number) => {
        // Determine if higlightable from first value of row
        const intent = isCellHighlight(table.content[row][0], highlight)
            ? 'primary'
            : 'none'

        return (
            <Cell intent={intent} loading={isLoading}>
                {table.content[row][col].toFixed(col ? roundPrecision : 0)}
            </Cell>
        )
    }

    // console.table(table.content)

    return (
        <StyledTable
            numRows={table.content.length}
            columnWidths={colWidths}
            onColumnWidthChanged={handleResize}
        >
            {table.headers.map((header: string, i: number) => (
                <Column
                    name={header}
                    cellRenderer={(row) => renderCell(row, i)}
                    key={`column-${i}`}
                />
            ))}
        </StyledTable>
    )
}

export default ProbabilityTable
