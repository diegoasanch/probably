import React, { useState } from 'react'
import { HomeHeader, HomeSubTitle, StyledLink } from '../../styles/typography'
import TextLoop from "react-text-loop"
import { getLandingPageOptions } from '../available'
// import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { HeaderContainer, LandingBackground, LandingContainer, ToggleButton } from './styles'
import LandingChart from '../../components/LandingChart'

const Home = () => {

    const { t } = useTranslation()
    const [playAnimation, setPlayAnimation] = useState(true)

    const toggleAnimation = () => {
        setPlayAnimation( prev => !prev )
    }

    return (
        <LandingContainer>
            <HeaderContainer>
                <HomeHeader>
                    Probability <br/> Distributions
                </HomeHeader>
                <HomeSubTitle>
                    {t('calculate-pre')}&nbsp;
                    <code>
                        <TextLoop>
                            {
                                getLandingPageOptions().map(option => (
                                    <StyledLink to={option.url}>{option.id}</StyledLink>
                                ))
                            }
                        </TextLoop>
                    </code>
                    {t('calculate-post')}
                </HomeSubTitle>

            </HeaderContainer>

            <LandingBackground>
                <LandingChart playAnimation={playAnimation} />
                <ToggleButton
                    icon={playAnimation ? 'pause' : 'play'}
                    onClick={toggleAnimation}
                    large
                />
            </LandingBackground>
        </LandingContainer>
    )
}

export default Home
