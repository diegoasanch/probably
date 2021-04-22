import { EditableText, H3 } from "@blueprintjs/core"
import styled from "styled-components"

const LandingContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
`

const LandingBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
`
const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
`
const ChartControls = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;

    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1em;
`
const StyledEditableText = styled(EditableText)`
    width: 1.6em;
    .bp3-editable-text-content {
        min-width: 1.8em !important;
    }

`
const SizeInput = styled(H3)`
    margin-right: .5em;
`


export {
    LandingContainer,
    LandingBackground,
    HeaderContainer,
    ChartControls,
    StyledEditableText,
    SizeInput,
}
