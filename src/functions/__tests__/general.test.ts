import { combinatory } from '../general'

test('Combinatory wrapper', () => {
    expect(combinatory(10, 3)).toBe(120)
    expect(combinatory(15, 5)).toBe(3003)
    expect(combinatory(10, 10)).toBe(1)

    // Invalid input
    expect(combinatory(10, 11)).toBe(0)
})
