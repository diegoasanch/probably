import React, { useState } from 'react'
import { Divider, H2, H4, H5, H6, Icon } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'

import { IPageInfo, PageCategory } from '../../types/pages'
import packageJSON from '../../../package.json'
import {
    SidebarContainer,
    Header,
    SideMain,
    SideFooter,
    SideNav,
    NavButton,
    CategoryTitle,
    SidebarDivider,
} from './styles'
import { StyledLink } from '../../styles/typography'
import DevTag from '../DevTag'
import { sidebarPages } from '../../pages/categories'

type IProps = {
    readonly current_page: IPageInfo
}

const Sidebar = ({ current_page }: IProps) => {
    const { t: translate } = useTranslation()

    // const [options] = useState(getSelectOptions())

    return (
        <SidebarContainer>
            <Header>
                <StyledLink to="/">
                    Probab<code>/ly</code>
                </StyledLink>
            </Header>

            <SideMain>
                <SideNav>
                    {sidebarPages.map((option: PageCategory) => (
                        <>
                            { option.name && <CategoryTitle>{option.name}</CategoryTitle>}
                            { option.pages.map( (page: IPageInfo) => (
                                <StyledLink
                                    to={page.disabled ? '#' : page.url}
                                    key={page.id}
                                >
                                    <NavButton
                                        selected={current_page.id === page.id}
                                        disabled={ page.disabled }
                                        isNested={ !!option.name }
                                    >
                                        <Icon
                                            icon={page.icon ?? 'function'}
                                            iconSize={15}
                                        />
                                        &nbsp;
                                        {translate(`select-${page.id}`)}
                                    </NavButton>
                                </StyledLink>

                            )) }
                        </>
                    ))}
                    {/* {options.map((option) => (
                        <StyledLink
                            to={option.disabled ? '#' : option.url}
                            key={option.id}
                        >
                            <NavButton
                                selected={current_page.id === option.id}
                                disabled={option.disabled}
                            >
                                <Icon
                                    icon={option.icon ?? 'function'}
                                    iconSize={15}
                                />
                                &nbsp;
                                {translate(`select-${option.id}`)}
                            </NavButton>
                        </StyledLink>
                    ))} */}
                </SideNav>
                <SidebarDivider />
                <SideFooter>
                    <H4>
                        <Icon className="bp3-text-muted" icon="git-branch" />
                        &nbsp;
                        {translate('view-on')}&nbsp;
                        <a
                            href="https://github.com/diegoasanch/probably"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    </H4>
                    <H5 className="bp3-text-muted">
                        version: {packageJSON.version}
                        {process.env.NODE_ENV === 'development' && <DevTag />}
                    </H5>
                    <H6 className="bp3-text-muted">
                        <Icon icon="code" />
                        &nbsp;
                        {translate('with')} 💖&nbsp;
                        {translate('by')}&nbsp;
                        <a
                            href="https://github.com/diegoasanch"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Diego.
                        </a>
                    </H6>
                </SideFooter>
            </SideMain>
        </SidebarContainer>
    )
}

export default Sidebar
