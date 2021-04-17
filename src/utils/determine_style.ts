const isCellHighlight = (
    value: number | string,
    highlight: string | string[] | undefined,
): boolean => {

    let is_highlight
    value = String(value)

    if (typeof(highlight) === 'string')
        is_highlight =  highlight === value

    else if (highlight instanceof Array)
        is_highlight = highlight.includes(value)
    else
        is_highlight = true

    // console.log({ is_highlight, value, highlight })
    return is_highlight
}

export {
    isCellHighlight
}
