import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { homepage } from '../package.json'

const { origin, pathname } = window.location
// console.log(origin, pathname)
// console.log(`Deployed translations  ${homepage}/locales/{{lng}}/translation.json`)
// console.log(`Local translations  ${origin}${pathname}/locales/{{lng}}/translation.json`)

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use (initReactI18next)
    .init({
        backend: {
          loadPath: (
              process.env.NODE_ENV === 'production' ?
              `${homepage}/locales/{{lng}}/translation.json`
              :
              `${origin}${pathname}/locales/{{lng}}/translation.json`
            ),
        },
        fallbackLng: 'es',
        debug: true,
        interpolation: {
            escapeValue: false
        }
    })

export default i18n
