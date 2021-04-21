import React from 'react'
import { H3, Icon } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import { StyledCallout } from '../../../styles/display'

type IProps = {
    a: string,
    b?: string,
}

const NoNAndP = ({ a, b }: IProps) => {
    const { t } = useTranslation()

    return (
        <StyledCallout>
            <H3>
                <span className="bp3-text-muted">
                    <Icon icon="calculator" iconSize={25} />&nbsp;
                </span>
                {t('specify')} <code>{a}</code>
                { b &&
                    <>
                        &nbsp;{t('and')} <code>{b}</code>
                    </>
                }
            </H3>
        </StyledCallout>
    )
}

export default NoNAndP
