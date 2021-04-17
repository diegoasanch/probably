import React, { Suspense, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { dark, light } from './styles/colors'
import { ThemeProvider } from 'styled-components'

import { FocusStyleManager, Spinner } from "@blueprintjs/core"
import Sidebar from './components/Sidebar'
import PageHeader from './components/PageHeader'
import { pageOptions, defaultPage } from './pages/available'

import { IPageInfo } from './types/pages'
import {
    ViewPort,
    SideContainer,
    AppPageContainer,
    PageFrame
} from './pages/layout'

FocusStyleManager.onlyShowFocusOnTabs()

function App() {

    const [isDark, setIsDark] = useLocalStorage('isDark', false)
    const [CurrentPage, setCurrentPage] = useState(defaultPage)

    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    console.log({ CurrentPage })

    const selectPage = (selected: IPageInfo) => {

        setCurrentPage(selected)

        // TODO: push id to url
        // TODO: use URL params from hash router
    }

    return (
        <Suspense fallback={<AppPageContainer> <Spinner /> </AppPageContainer>}>
            <ThemeProvider theme={isDark ? dark : light}>
                <ViewPort className={`.bp3-ui-text ${isDark ? 'bp3-dark' : ''}`}>

                    <SideContainer>
                        <Sidebar
                            current_page={CurrentPage}
                            available_pages={pageOptions}
                            setNewPage={selectPage}
                        />
                    </SideContainer>

                    <AppPageContainer>
                        <PageHeader
                            title={CurrentPage.title}
                            isDark={!!isDark}
                            toggleTheme={toggleTheme}
                        />
                        <PageFrame>
                            <CurrentPage.ToRenderPage />
                        </PageFrame>
                    </AppPageContainer>

                </ViewPort>
            </ThemeProvider>
        </Suspense>

    );
}

export default App;
