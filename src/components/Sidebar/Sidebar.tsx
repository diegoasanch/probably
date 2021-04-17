import React from 'react'
import { Button, Divider, H4, H5, H6, Icon, MenuItem } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import { Select } from '@blueprintjs/select'

import { IPageInfo } from '../../types/pages'
import styled from 'styled-components'
import packageJSON from '../../../package.json'
import {
    SidebarContainer,
    Header,
    SideMain,
    SideFooter,
} from './styles'

type IProps = {
    readonly current_page: IPageInfo,
    readonly available_pages: IPageInfo[],
    setNewPage: (newItem: IPageInfo) => void,
}

type IClickHandler = {
    handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
}

const PageSelect = Select.ofType<IPageInfo>()

const StyledSelect = styled(PageSelect)`
    width: 100%;
    padding: 1em 3.5em;
`

const Sidebar = ({
    current_page,
    available_pages,
    setNewPage
}: IProps ) => {

    const { t: translate } = useTranslation();

    // const initialContent = () => {
    //     return current_page ? <MenuItem text={current_page} disabled /> : undefined
    // }

    const renderItem = (item: IPageInfo, {handleClick}: IClickHandler) => (

        <MenuItem
            key={item.id}
            text={translate(`select-${item.id}`)}
            onClick={handleClick}
            active={current_page.id === item.id}
            disabled={item.disabled}
            icon={item.icon}
        />

    )

    return (
        <SidebarContainer>
            <Header>
                {translate('sidebar-header')}
            </Header>

            <Divider />

            <SideMain>
                <StyledSelect
                    // initialContent={initialContent}
                    items={available_pages}
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
                </StyledSelect>
                <SideFooter>
                    <H4>
                        <Icon className="bp3-text-muted" icon="git-branch" />&nbsp;
                        Ver en&nbsp;
                        <a href="https://github.com/diegoasanch/Estadistica_General">
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
