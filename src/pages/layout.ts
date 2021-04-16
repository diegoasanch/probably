import styled from 'styled-components'

const Column = styled.div`
    display: flex;
    flex-direction: column;
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
`

export const PageContainer = styled(Column)`
    width: 100%;
    height: 100%;
    padding: 2em;
    overflow-y: auto;
`

export const InputCol = styled(Row)`
    > * {
        margin: 1em;
    }
`
