import React from 'react'
import { Column, PageContainer, Row } from '../layout'
import { H1 } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import NoInput from '../../components/NoInputCards/No2'


// For displaying the specify a and b card when no input
type INoInputs = {
    a: string,
    b: string,
    c?: string,
}

type IProps = {
    input: JSX.Element,
    analysis: JSX.Element,
    table: JSX.Element,
    chart: JSX.Element,
    validInput: boolean,
    noInputs: INoInputs
}

/**
 * This is a stateles component, it is intended to be the blueprint for all of
 * the pages, receives the page components to render and places them accordingly
 * @returns
 */
const PageTemplate = ({ input, analysis, table, chart, validInput, noInputs }: IProps) => {

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
                        <NoInput {...noInputs} />
                    }
                </Column>
            </Row>
            <Row>
                <Column width="max-content" noGrow>
                    <H1>{t('table')}</H1>
                    { validInput ?
                        table
                      :
                        <NoInput {...noInputs} />
                    }
                </Column>
                <Column>
                    <H1>{t('chart')}</H1>
                    { validInput ?
                        chart
                      :
                        <NoInput {...noInputs} />
                    }
                </Column>
            </Row>
        </PageContainer>
    )
}

export default PageTemplate
