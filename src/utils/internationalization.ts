import i18n from '../i18n'
import enFlag from '../svg/uk.svg'
import esFlag from '../svg/spain.svg'

const DEFAULT_LANG = 'es'
const i18n_localstorage = 'i18nextLng'

export type ILang = 'es' | 'en'

const available_langs: ILang[] = ['es', 'en']

const flags = {
    es: esFlag,
    en: enFlag,
}

const setLang = (newLang: string): void => {
    i18n.changeLanguage(newLang)
    window.localStorage.setItem(i18n_localstorage, newLang)
}

const getLang = (): ILang => {
    const local = window.localStorage.getItem(i18n_localstorage) ?? 'es'
    let lang: ILang = 'es'

    if (local === 'es') lang = 'es'
    else if (local === 'en') lang = 'en'

    return lang

    // For some reason this, does not work (should be type safe)
    // if (available_langs.includes(local))
    //     return local
}

// If received `to_test` is not a valid language, returns `DEFAULT_LANG`
const validLang = (to_test: string): ILang => {
    let out: ILang = DEFAULT_LANG // fallback

    if (to_test === 'en') out = 'en'

    return out
}

export { DEFAULT_LANG, available_langs, flags, setLang, getLang, validLang }
