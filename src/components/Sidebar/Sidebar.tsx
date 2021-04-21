import React, { useState } from 'react'
import { Button, Divider, H4, H5, H6, Icon, MenuItem } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import { Select } from '@blueprintjs/select'

import { IPageInfo } from '../../types/pages'
import packageJSON from '../../../package.json'
import {
    SidebarContainer,
    Header,
    SideMain,
    SideFooter,
    SideNav,
} from './styles'
import { getSelectOptions } from '../../pages/available'
import { StyledLink } from '../../styles/typography'

type IProps = {
    readonly current_page: IPageInfo,
    readonly available_pages: IPageInfo[],
    setNewPage: (newItem: IPageInfo) => void,
}

type IClickHandler = {
    handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
}

const PageSelect = Select.ofType<IPageInfo>()

const Sidebar = ({
    current_page,
    available_pages,
    setNewPage
}: IProps ) => {

    const { t: translate } = useTranslation();

    const [options] = useState(getSelectOptions())

    const renderItem = (item: IPageInfo, {handleClick}: IClickHandler) => (

        <MenuItem
            key={item.id}
            text={translate(`select-${item.id}`)}
            onClick={handleClick}
            active={current_page.id === item.id}
            disabled={item.disabled}

            labelElement={<Icon icon={item.icon} /> }
        />

    )

    return (
        <SidebarContainer>
            <Header>
                <StyledLink to="/">{translate('sidebar-header')}</StyledLink>
            </Header>

            <Divider />

            <SideMain>
                <SideNav>
                    <StyledLink to="/">
                        <Button icon="home" large minimal>
                            {translate('pages-home')}
                        </Button>
                    </StyledLink>
                    <H4>
                        {translate('distribution')}
                    </H4>
                    <PageSelect
                        // initialContent={initialContent}
                        items={options}
                        itemRenderer={renderItem}
                        onItemSelect={setNewPage}
                        filterable={false}
                        noResults={<MenuItem text="No results." disabled={true} />}
                    >
                        <Button
                            icon="function"
                            text={translate(`select-${current_page.id}`)}
                            rightIcon="caret-down"
                        />
                    </PageSelect>
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
