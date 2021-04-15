import styled from 'styled-components'

export const SidebarContainer = styled.nav`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    color: ${props => props.theme.sidebarText};
    background-color: ${ props => props.theme.sidebarBg };
`
