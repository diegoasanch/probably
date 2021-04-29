import { getLang, setLang, validLang } from '../internationalization'

test('Default language', () => {
    expect(getLang()).toBe('es')
})

test('Change Language', () => {
    const newLang = 'en'
    setLang(newLang)
    expect(getLang()).toBe(newLang)
})

test('Get valid lang', () => {
    // If validlag receives an incalid lang, return default
    expect(validLang('whatever')).toBe('es')
    expect(validLang('en')).toBe('en')
})
