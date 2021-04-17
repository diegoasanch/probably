import React from "react"
import { IPageInfo } from "../types/pages"
import Binomial from "./Binomial"

// All available pages
export const binomial: IPageInfo = {
    id: 'binomial',
    title: 'pages-binomial',
    ToRenderPage: Binomial,
    disabled: false,
}

export const coming_soon: IPageInfo = {
    id: 'more_soon',
    title: 'pages-binomial',
    ToRenderPage: () => React.Fragment,
    disabled: true,
    icon: 'plus'
}

// Array of all of them
export const pageOptions: IPageInfo[] = [
    binomial,
    coming_soon,
]

export const defaultPage = binomial

