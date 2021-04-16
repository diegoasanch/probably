import React from 'react'
import {
    NavbarGroup,
    NavbarHeading,
    Alignment
} from '@blueprintjs/core'

import { StyledNavbar, StyledSwitch } from './styles'
import { useTranslation } from 'react-i18next'


type Iprops = {
    title: string,
    readonly isDark: boolean,
    toggleTheme: () => void,
}

const PageHeader = ({ title, isDark, toggleTheme }: Iprops) => {

    const { t } = useTranslation()

    return (
        <StyledNavbar>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>{t(title)}</NavbarHeading>
            </NavbarGroup>

            <NavbarGroup align={Alignment.RIGHT}>
                <StyledSwitch
                    alignIndicator={Alignment.RIGHT}
                    checked={isDark}
                    onChange={toggleTheme}
                    innerLabel="🌞"
                    innerLabelChecked="🌚"
                    large
                />
            </NavbarGroup>
        </StyledNavbar>
    )
}

export default PageHeader
