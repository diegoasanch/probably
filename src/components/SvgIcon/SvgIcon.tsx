import React from 'react'
import { InlineImg } from './styles'

type IProps = {
    src: string,
    name?: string
    height?: string,
}

const SvgIcon = ({ src, name, height }: IProps) => {
    return (
        <InlineImg src={src} alt={name ?? 'svg-icon'} height={height} />
    )
}

export default SvgIcon
