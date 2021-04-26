import styled from "styled-components";

type InlineProps = {
    width?: string,
    heigth?: string,
}

const InlineSvg = styled.svg<InlineProps>`
    height: ${props => props.height ?? '1.5em'};
    vertical-align: text-bottom;
`

const InlineImg = styled.img<InlineProps>`
    height: ${props => props.height ?? '1.5em'};
    vertical-align: text-bottom;
`

export {
    InlineSvg,
    InlineImg,
}
