import React from 'react'
import styled from 'styled-components'

const ImgContainer = styled.img`
    height: 1.5em;
`

type IProps = {
    src: string,
    name?: string
}

const SvgIcon = ({ src, name }: IProps) => {
    return (
        <ImgContainer src={src} alt={name ?? 'svg-icon'} />
    )
}

export default SvgIcon
