import { PageCategory } from "../types/pages";
import { binomial, coming_soon, home, hypergeometric, hyperPascal, pascal } from "./available";

const sidebar_top: PageCategory = {
    name: '',
    hideContent: false,
    pages: [ home ],
}

const sidebar_bottom: PageCategory = {
    name: '',
    hideContent: false,
    pages: [ coming_soon ],
}

const sidebar_discreteVars: PageCategory = {
    name: 'Variables Discretas',
    hideContent: false,
    pages: [
        binomial,
        pascal,
        hypergeometric,
        hyperPascal,
    ]
}
const sidebar_continuedVars: PageCategory = {
    name: 'Variables Continuas',
    hideContent: false,
    pages: [
        binomial,
        pascal,

    ]
}


const sidebarPages: PageCategory[] = [
    sidebar_top,
    sidebar_discreteVars,
    sidebar_continuedVars,
    sidebar_bottom,
]

export {
    sidebarPages
}
