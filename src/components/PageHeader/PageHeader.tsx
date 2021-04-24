import React from 'react'
import { StyledNavbar, StyledSwitch } from './styles'
import { useTranslation } from 'react-i18next'
import SelectLang from '../SelectLang'

import { IPageInfo } from '../../types/pages'
import { InlineIcon } from '../../styles/typography'
import {
    NavbarGroup,
    NavbarHeading,
    Alignment,
} from '@blueprintjs/core'

type Iprops = {
    title: string,
    currentPage: IPageInfo,
    readonly isDark: boolean,
    toggleTheme: () => void,
}

const PageHeader = ({ title, currentPage, isDark, toggleTheme }: Iprops) => {

    const { t } = useTranslation()

    return (
        <StyledNavbar>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>
                    { currentPage.icon &&
                        <InlineIcon icon={currentPage.icon} iconSize={12} />
                    }
                    {t(title)}
                </NavbarHeading>
            </NavbarGroup>

            <NavbarGroup align={Alignment.RIGHT}>
                <SelectLang />
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
