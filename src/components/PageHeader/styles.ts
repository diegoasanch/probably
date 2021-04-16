import { Navbar } from '@blueprintjs/core'
import styled from 'styled-components'
import { Switch } from '@blueprintjs/core'

export const StyledNavbar = styled(Navbar)`
    width: 100%;
    position: sticky;
    top: 0;
    &.bp3-navbar {
        background-color: ${ props => props.theme.sidebarBg};
    }
`

export const StyledSwitch = styled(Switch)`
    margin: .2em;
`
