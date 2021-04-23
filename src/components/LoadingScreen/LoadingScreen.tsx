import React from 'react'
import { Spinner } from '@blueprintjs/core'
import styled from 'styled-components'
import { Header } from '../Sidebar/styles'

const StyledHeader = styled(Header)`
    margin-bottom: .5em;
`
const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 5em;
`

const LoadingScreen = () => {
    return (
        <PageContainer>
            <StyledHeader>
                Probab<code>/ly</code>
            </StyledHeader>
            <Spinner intent="primary" />
        </PageContainer>
    )
}

export default LoadingScreen
