import React, { Suspense, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { dark, light } from './styles/colors'
import { ThemeProvider } from 'styled-components'
import { FocusStyleManager } from "@blueprintjs/core"
import Sidebar from './components/Sidebar'
import PageFrame from './components/PageFrame'
import {
    ViewPort,
    SideContainer,
    PageContainer
} from './styles/AppStyles'
import { IPageInfo } from './types/pages'
import Binomial from './pages/Binomial'
import PageHeader from './components/PageHeader'

FocusStyleManager.onlyShowFocusOnTabs()

const binomial: IPageInfo = {
    id: 'binomial',
    title: 'pages-binomial',
    ToRenderPage: Binomial
}

const defaultPage = binomial

const pageOptions: IPageInfo[] = [
    binomial
]

function App() {
    const [isDark, setIsDark] = useLocalStorage('isDark', true)
    const [currentPage, setCurrentPage] = useState(defaultPage)

    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    const selectPage = (newItem: IPageInfo) => {
        setCurrentPage(newItem)
    }

    console.log(typeof PageFrame)

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <ThemeProvider theme={isDark ? dark : light}>
                <ViewPort className={`.bp3-ui-text ${isDark ? 'bp3-dark' : ''}`}>
                    <SideContainer>
                        <Sidebar
                            current_page={currentPage}
                            available_pages={[]}
                            setNewPage={selectPage}
                        />
                    </SideContainer>
                    <PageContainer>
                        <PageHeader
                            title={currentPage.title}
                            isDark={!!isDark}
                            toggleTheme={toggleTheme}
                        />
                        <PageFrame
                            Page={currentPage}
                        />
                    </PageContainer>
                </ViewPort>
            </ThemeProvider>
        </Suspense>

    );
}

export default App;
