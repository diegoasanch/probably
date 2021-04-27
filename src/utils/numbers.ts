const inRange = (num: number, min: number, max: number): boolean => {
    return min <= num && num < max
}

export {
    inRange,
}
