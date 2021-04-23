import React from 'react'
import { Icon, Label, Position } from '@blueprintjs/core'
import { Tooltip2 } from "@blueprintjs/popover2"
import { useTranslation } from 'react-i18next'
import MathInput from '../MathInput'
import styled from 'styled-components'

const AcceptsFraction = () => {
    const { t } = useTranslation()
    return (
        <>
            {t('accepts-fract')}&nbsp;&nbsp; <code>1/2</code> = <code>0.5</code>
        </>
    )
}
const StyledLabel = styled(Label)`
    .bp3-icon {
        vertical-align: baseline;
    }
`

/**
 * This is just a wrapper for the MathInput component, will render the probability
 * label with a tooltip
 * @param props
 * @returns
 */
const ProbabilityInput = (props: any) => {
    const { t } = useTranslation()

    return (
        <StyledLabel>
            <Tooltip2 content={<AcceptsFraction />} position={Position.TOP}>
                <>
                    <code>p</code> = {t('success-prob')}&nbsp;
                    <Icon intent="primary" icon="info-sign" iconSize={12} />
                </>
            </Tooltip2>
            <MathInput {...props} />
        </StyledLabel>
    )
}

export default ProbabilityInput
