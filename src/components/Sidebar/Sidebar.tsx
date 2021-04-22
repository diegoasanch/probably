import React, { useState } from 'react'
import { H4, H5, H6, Icon } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'

import { IPageInfo } from '../../types/pages'
import packageJSON from '../../../package.json'
import {
    SidebarContainer,
    Header,
    SideMain,
    SideFooter,
    SideNav,
    NavButton,
} from './styles'
import { getSelectOptions } from '../../pages/available'
import { StyledLink } from '../../styles/typography'

type IProps = {
    readonly current_page: IPageInfo,
}

const Sidebar = ({
    current_page,
}: IProps ) => {

    const { t: translate } = useTranslation();

    const [options] = useState(getSelectOptions())

    return (
        <SidebarContainer>
            <Header>
                <StyledLink to="/">Probab<code>/ly</code></StyledLink>
            </Header>

            <SideMain>
                <SideNav>
                    {
                        options.map(option => (
                            <StyledLink to={option.disabled ? '#' : option.url}>
                                <NavButton
                                    selected={current_page.id === option.id}
                                    disabled={option.disabled}
                                >
                                    <Icon icon={option.icon ?? "function"} iconSize={16}/>&nbsp;
                                    {translate(`select-${option.id}`)}
                                </NavButton>
                            </StyledLink>
                        ))
                    }
                </SideNav>
                <SideFooter>
                    <H4>
                        <Icon className="bp3-text-muted" icon="git-branch" />&nbsp;
                        {translate('view-on')}&nbsp;
                        <a href="https://github.com/diegoasanch/Estadistica_General" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </H4>
                    <H5 className="bp3-text-muted">
                        version: {packageJSON.version}
                    </H5>
                    <H6 className="bp3-text-muted">
                        <Icon icon="code" />&nbsp;
                        {translate('with')} 💖&nbsp;
                        {translate('by')}&nbsp;
                        <a href="https://github.com/diegoasanch" target="_blank" rel="noopener noreferrer">
                            Diego.
                        </a>
                    </H6>
                </SideFooter>
            </SideMain>
        </SidebarContainer>
    )
}

export default Sidebar
