import {
    getAvailable,
    getLandingPageOptions,
    getSelectOptions,
} from '../available'

test('Has available pages', () => {
    expect(getAvailable().length).toBeGreaterThan(0)
    expect(getLandingPageOptions().length).toBeGreaterThan(0)
    expect(getSelectOptions().length).toBeGreaterThan(0)
})

test('Homepage item exists 😛', () => {
    expect(getAvailable()).toContain('home')
})
