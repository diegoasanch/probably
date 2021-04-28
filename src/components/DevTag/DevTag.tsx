import React from 'react'
import { Position } from '@blueprintjs/core'
import { Tooltip2 } from '@blueprintjs/popover2'
import styled from 'styled-components'

const StyledTag = styled.code`
    margin-left: 0.5em;
`

const TooltipContent = () => (
    <span>
        You are running the <code>development</code> version of Probab
        <code>/ly</code>
    </span>
)

const DevTag = () => {
    return (
        <Tooltip2 content={<TooltipContent />} position={Position.RIGHT}>
            <StyledTag>• dev</StyledTag>
        </Tooltip2>
    )
}

export default DevTag
