import React, { Suspense, useEffect, useState } from 'react'
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
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import Binomial from './pages/Binomial'
import Pascal from './pages/Pascal'

FocusStyleManager.onlyShowFocusOnTabs()

function App() {

    const [isDark, setIsDark] = useLocalStorage('isDark', false)
    const history = useHistory()
    const [currentPage, setCurrentPage] = useState(defaultPage)

    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    const selectPage = (selected: IPageInfo) => {
        setCurrentPage(selected)
        history.push('/' + selected.id)
    }

    useEffect(() => {
        let location = history.location.pathname.split('/')[1]

        // TODO: Maybe catch a 404 here ?
        // const availablePages = getAvailable()
        // if (!location || !availablePages.includes(location))
        //     location = defaultPage.id

        const page = pageOptions.find(
            item => item.id === location && !item.disabled
        ) ?? defaultPage


        console.log("Current page")
        console.log(location, page)
        setCurrentPage(page)
    // eslint-disable-next-line
    }, [])

    return (
        <Suspense fallback={<AppPageContainer> <Spinner /> </AppPageContainer>}>
            <ThemeProvider theme={isDark ? dark : light}>
                <ViewPort className={`.bp3-ui-text ${isDark ? 'bp3-dark' : ''}`}>

                    <SideContainer>
                        <Sidebar
                            current_page={currentPage}
                            available_pages={pageOptions}
                            setNewPage={selectPage}
                        />
                    </SideContainer>

                    <AppPageContainer>
                        <PageHeader
                            title={currentPage.title}
                            isDark={!!isDark}
                            toggleTheme={toggleTheme}
                        />
                        <PageFrame>

                            <HashRouter>
                                <Switch>
                                    <Route exact path="/binomial">
                                        <Binomial />
                                    </Route>
                                    <Route exact path="/pascal">
                                        <Pascal />
                                    </Route>
                                </Switch>
                            </HashRouter>

                        </PageFrame>
                    </AppPageContainer>

                </ViewPort>
            </ThemeProvider>
        </Suspense>

    );
}

export default App;
