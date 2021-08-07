import { Text, H1, H2, Divider } from '@blueprintjs/core'
import styled from 'styled-components'

export const SidebarContainer = styled.nav`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    color: ${(props) => props.theme.sidebarText};
    background-color: ${(props) => props.theme.sidebarBg};
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
        font-size: 0.9em;
        padding-left: 0.1em;
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
    padding: 1em 1em 0;
    align-items: flex-start;
    background-color: ${props => [props.theme.sidebarBg]};
    height: 6.4rem;
`
export const SideNav = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: calc(100% - .5rem);
    margin-left: 0.5em;
    padding-top: 3em;
    height: calc(100% - 6rem - 4vh);
    overflow: auto;

    > * {
        padding: 0.5em 0;
    }
`

export const CategoryTitle = styled(H2)`
    font-size: 1.3em !important;
    margin: 0 .2em;
    padding-bottom: .2em;
    color: ${props => props.theme.sidebarTitle} !important;
`

type NavProp = {
    selected: boolean
    disabled: boolean
    isNested?: boolean
}

export const NavButton = styled(Text)<NavProp>`
    display: flex;
    font-size: 1.5em;
    align-items: baseline;
    padding-left: ${props => props.isNested ? '0.8em': '0.4em'};
    transition: 100ms ease-in-out;

    color: ${(props) =>
        props.selected
            ? props.theme.code
            : props.disabled
            ? props.theme.disabled_link
            : 'inherit'};
    border-left: ${(props) =>
        props.selected ? `4px solid ${props.theme.code}` : 'none'};

    &:hover {
        border-left: 4px solid;
    }
`

export const SidebarDivider = styled(Divider)`
    width: 90%;
    margin: 2vh 0 0;
    border-color: ${props => props.theme.disabled_link } !important;
`
