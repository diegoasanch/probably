import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
    a: string,
    b: string,
}

const NoGreater = ({ a,  b }: Props) => {

    const { t } = useTranslation()

    return (
        <span>
            <code>{a}</code> {t('no-greater')} <code>{b}</code>
        </span>

    )
}
export default NoGreater
