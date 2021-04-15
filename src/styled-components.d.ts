import 'styled-components'
import ITheme from './types/theme'

declare module 'styled-components' {
    export interface DefaultTheme extends ITheme {}
}
