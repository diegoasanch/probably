import { IPageInfo } from "../types/pages"

// All available pages
const binomial: IPageInfo = {
    id: 'binomial',
    title: 'pages-binomial',
    disabled: false,
}

const pascal: IPageInfo = {
    id: 'pascal',
    title: 'pages-pascal',
    disabled: false,
}

const coming_soon: IPageInfo = {
    id: 'more_soon',
    title: 'pages-binomial',
    disabled: true,
    icon: 'plus'
}

// Array of all of them
const pageOptions: IPageInfo[] = [
    binomial,
    pascal,
    coming_soon,
]

const defaultPage = binomial

const getAvailable = (): string[] => {
    return pageOptions.map(item => item.id)
}

export {
    binomial,
    pascal,
    coming_soon,
    pageOptions,
    defaultPage,
    getAvailable,
}
