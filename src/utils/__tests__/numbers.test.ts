import { inRange } from '../numbers'

test('Numbers in range', () => {
    expect(inRange(4, 0, 10)).toBeTruthy()
    expect(inRange(10, 10, 11)).toBeTruthy()
    expect(inRange(25, 10, 25)).toBeFalsy()
    expect(inRange(24, 10, 25)).toBeTruthy()
})
