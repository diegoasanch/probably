import { H1 } from '@blueprintjs/core'
import React from 'react'
import { IPageInfo } from '../../types/pages'
import { Container } from './styles'

type Iprops = {
    Page: IPageInfo
}

const PageFrame = ({ Page }: Iprops) => {
    return (
        <Container>
            <Page.ToRenderPage />
        </Container>
    )
}

export default PageFrame
