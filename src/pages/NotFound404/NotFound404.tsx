import React from 'react'
import styled from 'styled-components'
import { HomeHeader, HomeSubTitle } from '../../styles/typography'
import { CenteredContainer } from '../layout'
import { H3 } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'

import ThinkingIcon from '../../components/SvgIcon/ThinkingIcon'

const StyledSubTitle = styled(HomeSubTitle)`
    margin: 0;
`
const MinText = styled(H3)`
    color: ${(props) => props.theme.disabled_link} !important;
`

const NotFound404 = () => {
    const { t } = useTranslation()

    return (
        <CenteredContainer>
            <HomeHeader>
                <code>404</code>
            </HomeHeader>

            <StyledSubTitle>{t('404-title')}</StyledSubTitle>

            <MinText>
                {t('404-subtitle')} <ThinkingIcon />
            </MinText>
        </CenteredContainer>
    )
}

export default NotFound404
