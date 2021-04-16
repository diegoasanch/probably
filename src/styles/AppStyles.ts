import styled from 'styled-components'

const sideBarWidth = '20vw'
const minSideBarWidth = '250px'

export const ViewPort = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
`
export const SideContainer = styled.div`
    width: ${sideBarWidth};
    height: 100%;
    min-width: ${minSideBarWidth};
`
export const PageContainer = styled.div`
    width: calc(100% - ${sideBarWidth});
    height: 100%;
    overflow-y: auto;
    min-width: ${minSideBarWidth};
`
