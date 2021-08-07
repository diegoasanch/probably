import { IconName } from '@blueprintjs/icons'

export interface PageCategory {
    name?: string,
    // index: number,
    hideContent: boolean,
    pages: IPageInfo[],
}

export type IPageInfo = {
    id: string
    url: string
    title: string
    disabled: boolean
    landingPage: boolean
    select: boolean
    icon?: IconName
}

export type IOperationType = 'p' | 'f' | 'g'
