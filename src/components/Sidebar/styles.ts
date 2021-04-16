import { H1 } from '@blueprintjs/core'
import styled from 'styled-components'

export const SidebarContainer = styled.nav`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    color: ${props => props.theme.sidebarText};
    background-color: ${ props => props.theme.sidebarBg };
`

export const Header = styled(H1)`
    font-size: 2.5em !important;
    line-height: .9em !important;
    font-weight: bold;
    align-self: flex-start;
    word-wrap: break-word;
    margin: 1em 0;
`
