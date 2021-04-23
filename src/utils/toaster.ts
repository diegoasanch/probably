import React from 'react'
import { Position, Toaster, Intent } from '@blueprintjs/core'

const AppToaster = Toaster.create({
    className: "recipe-toaster",
    position: Position.TOP,
    maxToasts: 3,
})

const showToast = (message: string | React.ReactNode, intent?: Intent) => {
    AppToaster.show({ message, intent })
}

export {
    showToast,
}
