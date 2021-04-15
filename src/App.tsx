import React from 'react'
import { useLocalStorage } from 'react-use'
import { dark, light } from './styles/colors'
import styled, { ThemeProvider } from 'styled-components'
import Sidebar from './components/Sidebar'

const ViewPort = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
`
const SideContainer = styled.div`
    width: 15vw;
    min-width: 200px;
    height: 100%;
`
const PageContainer = styled.div`
    width: calc(100% - 15vw);
    height: 100%;
`

function App() {
    const [isDark, setIsDark] = useLocalStorage('isDark', true)

    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    return (
        <ThemeProvider theme={isDark ? dark : light}>
            <ViewPort className={`.bp3-ui-text ${isDark ? 'bp3-dark' : ''}`}>
                <SideContainer>
                    <Sidebar />
                </SideContainer>
                <PageContainer>
                    <h1>Hello</h1>
                </PageContainer>
            </ViewPort>
        </ThemeProvider>
    );
}

export default App;
