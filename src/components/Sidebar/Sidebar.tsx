import { H1 } from '@blueprintjs/core'
import React from 'react'
import { SidebarContainer } from './styles'

type IProps = {
    readonly current_page: string,
    readonly available_pages: string[],
    readonly isDark: boolean,
    toggleTheme: () => void,
    setNewPage: (new_page: string) => void,
}

const Sidebar = () => {
// const Sidebar = ({
//     current_page,
//     available_pages,
//     isDark,
//     toggleTheme,
//     setNewPage
// }: IProps ) => {

    return (
        <SidebarContainer>
            <H1>
                Distributions
            </H1>
        </SidebarContainer>
    )
}

export default Sidebar
