import React from 'react'
import { Spinner } from '@blueprintjs/core'
import styled from 'styled-components'
import { Header } from '../Sidebar/styles'
import { CenteredContainer } from '../../pages/layout'

const StyledHeader = styled(Header)`
    margin-bottom: .5em;
`

const LoadingScreen = () => {
    return (
        <CenteredContainer>
            <StyledHeader>
                Probab<code>/ly</code>
            </StyledHeader>
            <Spinner intent="primary" />
        </CenteredContainer>
    )
}

export default LoadingScreen
