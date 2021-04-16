import React from 'react'
import { Button, Divider, MenuItem } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import {
    SidebarContainer,
    Header,
} from './styles'
import { Select } from '@blueprintjs/select'
import { IPageInfo } from '../../types/pages'
import styled from 'styled-components'

const PageSelect = Select.ofType<IPageInfo>()

type IProps = {
    readonly current_page: IPageInfo,
    readonly available_pages: IPageInfo[],
    setNewPage: (newItem: IPageInfo) => void,
}

// const Sidebar = () => {
const Sidebar = ({
    current_page,
    available_pages,
    setNewPage
}: IProps ) => {

    const {t, i18n} = useTranslation();

    return (
        <SidebarContainer>
            <Header>
                {t('sidebar-header')}
            </Header>

            <Divider />

            <PageSelect
                items={available_pages}
                initialContent={current_page}
                // itemRenderer={item => t(`select-${item.id}`)}
                itemRenderer={item => (
                    <MenuItem key={item.id} />
                )}
                onItemSelect={setNewPage}
            >
                <Button text={current_page.title} icon="function" rightIcon="caret-down" />
            </PageSelect>
        </SidebarContainer>
    )
}

export default Sidebar
