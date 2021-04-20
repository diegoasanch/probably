import React from 'react'
import { Column, PageContainer, Row } from '../layout'
import { H1 } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import NoNAndP from '../../components/NoInputCards/NoNAndP'

type IProps = {
    input: JSX.Element,
    analysis: JSX.Element,
    table: JSX.Element,
    chart: JSX.Element,
    validInput: boolean,
}

/**
 * This is a stateles component, it is intended to be the blueprint for all of
 * the pages, receives the page components to render and places them accordingly
 * @returns
 */
const PageTemplate = ({ input, analysis, table, chart, validInput }: IProps) => {

    const { t } = useTranslation()


    return (
        <PageContainer>
            <Row>
                <Column>
                    <H1>Input</H1>
                    { input }
                </Column>
                <Column>
                    <H1>{t('analysis')}</H1>
                    { validInput ?
                        analysis
                      :
                        <NoNAndP />
                    }
                </Column>
            </Row>
            <Row>
                <Column width="max-content" noGrow>
                    <H1>{t('table')}</H1>
                    { validInput ?
                        table
                      :
                        <NoNAndP />
                    }
                </Column>
                <Column>
                    <H1>{t('chart')}</H1>
                    { validInput ?
                        chart
                      :
                        <NoNAndP />
                    }
                </Column>
            </Row>
        </PageContainer>
    )
}

export default PageTemplate
