import { Icon } from '@blueprintjs/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

const NoNegative = () => {
    const { t } = useTranslation()

    return (
        <span>
            <Icon icon="warning-sign" /> {t('no-negative')}
        </span>
    )
}
export default NoNegative
