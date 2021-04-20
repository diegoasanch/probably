import { H3, Icon } from '@blueprintjs/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledCallout } from '../../../styles/display'


const NoR = () => {

    const { t } = useTranslation()

    return (
        <StyledCallout>
            <H3>
                <span className="bp3-text-muted">
                    <Icon icon="calculator" iconSize={25} />&nbsp;
                </span>
                {t('specify')} <code>r</code>
            </H3>
        </StyledCallout>
    )
}

export default NoR
