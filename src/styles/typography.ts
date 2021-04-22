import { H1, H2 } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeHeader = styled(H1)`
    text-align: center;
    font-size: 5em !important;
    line-height: 1em !important;
    font-weight: bold;
    padding: .2em;
    border-radius: .1em;

    /* background-color: ${props => props.theme.background + "CC"};
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px ); */

`
const HomeSubTitle = styled(H2)`
    /* text-align: center; */
    font-size: 3em !important;
    margin-top: .5em;
    margin-bottom: 2em;

    padding: .5em;
    border-radius: .1em;
    /* background-color: ${props => props.theme.background + "AA"};
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px ); */
`
const StyledLink = styled(Link)`
    color: inherit !important;

    code {
        color: ${props => props.theme.code } !important ;
    }

`


export {
    HomeHeader,
    HomeSubTitle,
    StyledLink
}
