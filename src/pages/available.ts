import { IPageInfo } from "../types/pages"

// All available pages
const home: IPageInfo = {
    id: 'home',
    url: '',
    title: 'pages-home',
    disabled: false,
    landingPage: false,
    select: true,
    icon: 'home'
}

const binomial: IPageInfo = {
    id: 'binomial',
    url: 'binomial',
    title: 'pages-binomial',
    disabled: false,
    landingPage: true,
    select: true,
    icon: 'function',
}

const pascal: IPageInfo = {
    id: 'pascal',
    url: 'pascal',
    title: 'pages-pascal',
    disabled: false,
    landingPage: true,
    select: true,
    icon: 'function',
}

const hypergeometric: IPageInfo = {
    id: 'hypergeometric',
    url: 'hypergeometric',
    title: 'pages-hypergeometric',
    disabled: false,
    landingPage: true,
    select: true,
    icon: 'function',
}

const coming_soon: IPageInfo = {
    id: 'more_soon',
    url: '',
    title: 'pages-binomial',
    disabled: true,
    landingPage: false,
    select: true,
    icon: 'plus'
}

// Array of all of them
const pageOptions: IPageInfo[] = [
    home,
    binomial,
    pascal,
    hypergeometric,
    coming_soon,
]

const defaultPage = home

const getAvailable = (): string[] => {
    return pageOptions.map(item => item.id)
}

const getLandingPageOptions = (): IPageInfo[] => {
    return pageOptions.filter(item => item.landingPage)
}

const getSelectOptions = (): IPageInfo[] => {
    return pageOptions.filter(item => item.select)
}


export {
    home,
    binomial,
    pascal,
    hypergeometric,
    coming_soon,
    pageOptions,
    defaultPage,
    getAvailable,
    getLandingPageOptions,
    getSelectOptions,
}
