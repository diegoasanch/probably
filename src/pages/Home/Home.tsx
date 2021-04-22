import React, { useState } from 'react'
import { HomeHeader, HomeSubTitle, StyledLink } from '../../styles/typography'
import TextLoop from "react-text-loop"
import { getLandingPageOptions } from '../available'
// import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChartControls, HeaderContainer, LandingBackground, LandingContainer, SizeInput, StyledEditableText } from './styles'
import LandingChart from '../../components/LandingChart'
import { Button } from '@blueprintjs/core'

const INITIAL_SIZE = 70

const cleanSize = (value: string): number => {
    const newSize = parseInt(value)
    let result: number

    if (!isNaN(newSize)) {
        if (newSize < 1)
            result = 1
        else if (newSize > 150)
            result = 150
        else
            result = newSize
    }
    else if (value === '')
        result = 0
    else
        result = INITIAL_SIZE

    return result
}

const Home = () => {

    const { t } = useTranslation()
    const [playAnimation, setPlayAnimation] = useState(true)
    const [size, setSize] = useState(INITIAL_SIZE)

    const toggleAnimation = () => {
        setPlayAnimation( prev => !prev )
    }


    const handleSize = (value: string) => {
        setSize(cleanSize(value))
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
                <LandingChart playAnimation={playAnimation} size={size - 1} />
                <ChartControls>
                    <SizeInput>
                        <code>
                            n =&nbsp;
                            <StyledEditableText
                                value={String(size)}
                                onChange={handleSize}
                                maxLength={3}
                            />
                        </code>
                    </SizeInput>
                    <Button
                        intent="primary"
                        icon={playAnimation ? 'pause' : 'play'}
                        onClick={toggleAnimation}
                        large
                    />
                </ChartControls>
            </LandingBackground>
        </LandingContainer>
    )
}

export default Home
