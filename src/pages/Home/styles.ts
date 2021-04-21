import { Button } from "@blueprintjs/core"
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
const ToggleButton = styled(Button)`
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1em;
`
export {
    LandingContainer,
    LandingBackground,
    HeaderContainer,
    ToggleButton,
}
