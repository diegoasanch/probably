import React from 'react'
import { Button, Divider, MenuItem } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import { Select } from '@blueprintjs/select'

import { IPageInfo } from '../../types/pages'
import {
    SidebarContainer,
    Header,
} from './styles'
import styled from 'styled-components'

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
        </SidebarContainer>
    )
}

export default Sidebar
