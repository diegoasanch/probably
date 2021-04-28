import React, { Suspense, useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'
import { dark, light } from './styles/colors'
import { ThemeProvider } from 'styled-components'

import { FocusStyleManager } from '@blueprintjs/core'
import Sidebar from './components/Sidebar'
import PageHeader from './components/PageHeader'
import { pageOptions, defaultPage } from './pages/available'

import { HashRouter, Route, Switch, useLocation } from 'react-router-dom'
import Binomial from './pages/Binomial'
import Pascal from './pages/Pascal'
import Home from './pages/Home'

import Hypergeometric from './pages/Hypergeometric'
import LoadingScreen from './components/LoadingScreen'
import NotFound404 from './pages/NotFound404'
import {
    ViewPort,
    SideContainer,
    AppPageContainer,
    PageFrame,
} from './pages/layout'
import HyperPascal from './pages/HyperPascal'

FocusStyleManager.onlyShowFocusOnTabs()

function App() {
    const location = useLocation()

    const [isDark, setIsDark] = useLocalStorage('isDark', false)
    const [currentPage, setCurrentPage] = useState(defaultPage)

    const toggleTheme = () => {
        setIsDark(!isDark);
    }

    // Select curent page form url
    useEffect(() => {
        const current_location = location.pathname.substring(1)

        const page =
            pageOptions.find(
                (item) => item.url === current_location && !item.disabled,
            ) ?? defaultPage

        setCurrentPage(page)

        // Google analytics
        if (typeof (window as any).gtag === 'function') {
            ;(window as any).gtag(
                'set',
                'page',
                location.pathname + location.hash + location.search,
            )
            ;(window as any).gtag('send', 'pageview')
        }

        // eslint-disable-next-line
    }, [location.pathname])

    return (
        <ThemeProvider theme={isDark ? dark : light}>
            <ViewPort className={`.bp3-ui-text ${isDark ? 'bp3-dark' : ''}`}>
                <Suspense fallback={<LoadingScreen />}>
                    <SideContainer>
                        <Sidebar current_page={currentPage} />
                    </SideContainer>

                    <AppPageContainer>
                        <PageHeader
                            title={currentPage.title}
                            currentPage={currentPage}
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
                                    <Route exact path="/hypergeometric">
                                        <Hypergeometric />
                                    </Route>
                                    <Route exact path="/hyperpascal">
                                        <HyperPascal />
                                    </Route>
                                    <Route exact path="/">
                                        <Home />
                                    </Route>
                                    <Route path="/">
                                        <NotFound404 />
                                    </Route>
                                </Switch>
                            </HashRouter>
                        </PageFrame>
                    </AppPageContainer>
                </Suspense>
            </ViewPort>
        </ThemeProvider>
    )
}

export default App
