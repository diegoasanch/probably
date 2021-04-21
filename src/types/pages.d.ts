import { IconName } from "@blueprintjs/icons";

export type IPageInfo = {
    id: string,
    title: string,
    disabled: boolean,
    icon?: IconName,
}

export type IOperationType = 'p' | 'f' | 'g'
