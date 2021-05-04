import {
    accumulatedLeft,
    accumulatedRight,
    assymetry,
    binomialModel,
    expectedValue,
    kurtosis,
    partialLeftExpected,
    partialRightExpected,
    stdDeviation,
    variance,
} from '../binomials'

// Test results taken from my statistics professor's program: DIS.exe, a 16 bit
// relic of the 90's.

test('A few punctual probabilities', () => {
    expect(binomialModel(6, 10, 0.35)).toBeCloseTo(0.06891)
    expect(binomialModel(25, 30, 0.87)).toBeCloseTo(0.16275)
    expect(binomialModel(210, 250, 0.9)).toBeCloseTo(0.00092)
})

test('Accumulated values', () => {
    // Accumulated left
    expect(accumulatedLeft(6, 10, 0.35)).toBeCloseTo(0.97398)
    expect(accumulatedLeft(25, 30, 0.87)).toBeCloseTo(0.3499)
    expect(accumulatedLeft(210, 250, 0.9)).toBeCloseTo(0.00205)

    // Accumulated right
    expect(accumulatedRight(6, 10, 0.35)).toBeCloseTo(0.09493)
    expect(accumulatedRight(25, 30, 0.87)).toBeCloseTo(0.81205)
    expect(accumulatedRight(210, 250, 0.9)).toBeCloseTo(0.99887)
})

test('The full analysis', () => {
    expect(expectedValue(30, 0.87)).toBeCloseTo(26.1)
    expect(variance(30, 0.87)).toBeCloseTo(3.393)
    expect(stdDeviation(30, 0.87)).toBeCloseTo(1.84201)
    expect(assymetry(30, 0.87)).toBeCloseTo(-0.40174)
    expect(kurtosis(30, 0.87)).toBeCloseTo(3.09472)

    expect(partialLeftExpected(6, 10, 0.35)).toBeCloseTo(3.312441)
    expect(partialRightExpected(6, 10, 0.35)).toBeCloseTo(0.6010175)
})
