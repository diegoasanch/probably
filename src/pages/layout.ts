import styled from 'styled-components'

const sideBarWidth = '20vw'
const minSideBarWidth = '250px'

type IContainer = {
    width?: 'auto' |  '100%' | '' | 'max-content' | string ,
    height?: string,
    margin?: string,
    noPad?: boolean,
    noGrow?: boolean,
}

const ViewPort = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
`

const SideContainer = styled.div`
    width: ${sideBarWidth};
    height: 100%;
    min-width: ${minSideBarWidth};
`

const AppPageContainer = styled.div`
    width: calc(100% - ${sideBarWidth});
    height: 100%;
    overflow-y: auto;
    min-width: ${minSideBarWidth};
`

const PageFrame = styled.main`
    position: relative;
    width: 100%;
    overflow: auto;
    margin: 0;
    background-color: ${ props => props.theme.background };
    color: ${props => props.theme.text };
`



const Column = styled.div<IContainer>`
    display: flex;
    flex-direction: column;
    flex-grow: ${props => props.noGrow ? 0 : 1};
    height: ${ props => props.height ?? '100%'};
    width: ${ props => props.width ?? 'calc(max-content + 10vw)'};
    min-width: max-content;

    margin: ${props => (
        props.noPad ? '0' : (
            props.margin ?? '1em'
        )
    )};
`

const Row = styled.div<IContainer>`
    display: flex;
    flex-direction: row;
    margin: ${props => props.noPad ? '0' : 'inherit'};
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
}
