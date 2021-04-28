import { H1, H2, Icon } from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HomeHeader = styled(H1)`
    text-align: center;
    font-size: 5em !important;
    line-height: 1em !important;
    font-weight: bold;
    padding: 0.2em;
    border-radius: 0.1em;

    /* background-color: ${(props) => props.theme.background + 'CC'};
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px ); */
`
const HomeSubTitle = styled(H2)`
    /* text-align: center; */
    font-size: 3em !important;
    margin-top: 0.5em;
    margin-bottom: 2em;

    padding: 0.5em;
    border-radius: 0.1em;
    /* background-color: ${(props) => props.theme.background + 'AA'};
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px ); */
`
const StyledLink = styled(Link)`
    color: inherit !important;

    code {
        color: ${(props) => props.theme.code} !important ;
    }
`

const InlineIcon = styled(Icon)`
    vertical-align: baseline;
    margin: 0 0.3em;
`

export { HomeHeader, HomeSubTitle, StyledLink, InlineIcon }
