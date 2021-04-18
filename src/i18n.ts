import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const { origin, pathname } = window.location

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use (initReactI18next)
    .init({
        backend: {
          loadPath: `${origin}/${pathname}/locales/{{lng}}/translation.json`,
        },
        fallbackLng: 'es',
        debug: true,
        interpolation: {
            escapeValue: false
        }
    })

export default i18n
