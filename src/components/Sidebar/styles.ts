import { Text, H1 } from '@blueprintjs/core'
import styled from 'styled-components'

export const SidebarContainer = styled.nav`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    color: ${props => props.theme.sidebarText};
    background-color: ${ props => props.theme.sidebarBg };
    border-right: 3px solid "#CACBCC";
`

export const Header = styled(H1)`
    font-size: 2.5em !important;
    line-height: 1.2em !important;
    font-weight: bold;
    word-wrap: break-word;
    width: 100%;
    margin: 1em 0;
    text-align: center;

    code {
        font-size: .9em;
        padding-left: .1em;
    }
`

export const SideMain = styled.main`
    position: relative;
    /* padding-top: 3em; */
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const SideFooter = styled.footer`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 1em;
    align-items: flex-start;
`
export const SideNav = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3em;

    > * {
        padding: .5em 0;
    }
`

type NavProp = {
    selected: boolean,
    disabled: boolean,
}

export const NavButton = styled(Text)<NavProp>`
    display: flex;
    font-size: 1.8em;
    align-items: baseline;
    color: ${props => (
        props.selected ? props.theme.code
        :
        props.disabled ? props.theme.disabled_link
        : 'inherit'
    )};
    padding-left: .5em;
    border-left: ${props => (
        props.selected ?
            `3px solid ${props.theme.code}`

        : 'none'
    )};
`
