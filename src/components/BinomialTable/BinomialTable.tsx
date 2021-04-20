import React from 'react'
import { Cell, Column, Table } from '@blueprintjs/table'
import { IBinomialTable } from '../../types/tables'
import { isCellHighlight } from '../../utils/determine_style'

//! ---------------------------- TODO: lint this ----------------------------

import styled from 'styled-components'

const StyledTable = styled(Table)`
    height: min-content;
`
//! ---------------------------- END LINT  ----------------------------


type IProps = {
    table: IBinomialTable,
    precision: number,
    isLoading: boolean,
    highlight?: string | string[],
}

const BinomialTable = ({ table, precision, highlight, isLoading }: IProps) => {

    const renderCell = (row: number, col: number) => {
        const intent = isCellHighlight(row, highlight) ? 'primary' : 'none'
        // console.log(`Cell intent: ${intent}`)

        return (
            <Cell intent={intent} loading={isLoading}>
                { table.content[row][col]
                    .toFixed(col ? precision : 0)
                }
            </Cell>
        )
    }

    console.table(table.content)

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
