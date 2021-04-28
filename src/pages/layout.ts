import styled from 'styled-components'

// const sideBarWidth = '20vw'
const minSideBarWidth = '250px'

type IContainer = {
    width?: 'auto' | '100%' | '' | 'max-content' | string
    height?: string
    margin?: string
    noPad?: boolean
    noGrow?: boolean
}

const ViewPort = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;

    > * ::-webkit-scrollbar {
        background-color: ${(props) => props.theme.scrollBarBg};
        width: 10px;
        height: 10px;
        border-radius: 10px;
    }
    > * ::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.scrollBarThumb};
        border-radius: 5px;
    }
`

const SideContainer = styled.div`
    width: ${minSideBarWidth};
    height: 100%;
    min-width: ${minSideBarWidth};
    /* max-wid */
`

const AppPageContainer = styled.div`
    width: calc(100% - ${minSideBarWidth});
    height: 100%;
    overflow-y: auto;
    min-width: ${minSideBarWidth};
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PageFrame = styled.main`
    position: relative;
    width: 100%;
    overflow: auto;
    margin: 0;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    max-width: 1050px;
    height: 100%;
`

const Column = styled.div<IContainer>`
    display: flex;
    flex-direction: column;
    flex-grow: ${(props) => (props.noGrow ? 0 : 1)};
    height: ${(props) => props.height ?? '100%'};
    width: ${(props) => props.width ?? '100%'};
    min-width: max-content;

    margin: ${(props) => (props.noPad ? '0' : props.margin ?? '1em')};
`

const Row = styled.div<IContainer>`
    display: flex;
    flex-direction: row;
    margin: ${(props) => (props.noPad ? '0' : 'inherit')};
`
const Container = styled(Column)<IContainer>`
    width: 100%;
    height: 100%;
    min-width: max-content;
    margin: 0;
`
const OverflowContainer = styled(Container)<IContainer>`
    overflow: auto;
`

const PageContainer = styled(Container)<IContainer>`
    padding: 2em;
    margin: 0;
    overflow: auto;
`

const CenteredContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export {
    ViewPort,
    SideContainer,
    PageFrame,
    Column,
    Row,
    Container,
    OverflowContainer,
    AppPageContainer,
    PageContainer,
    CenteredContainer,
}
