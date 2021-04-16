import styled from 'styled-components'

export const Container = styled.main`
    position: relative;
    /* height: 100%; */
    width: 100%;
    margin: 0;
    background-color: ${ props => props.theme.background };
    color: ${props => props.theme.text };
`
