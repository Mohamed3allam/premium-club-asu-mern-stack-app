import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useActivityImgContext } from '../../../../../hooks/useActivityImgContext'
import { useAuthContext } from '../../../../../hooks/useAuthContext'

const CarouselContainer = styled.div`
    width: 70%;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-direction: column;
`
const CarouselWrapper = styled.div`
    display: flex;
    width: 100%;
    position: relative;
`
const CarouselContentWrapper = styled.div`
    overflow: hidden;
    width: 100%;
    height: 100%;
`
const CarouselContent = styled.div`
    display: flex;
    transition: all 0.4s ;
    -ms-overflow-style: none;  /* hide scrollbar in IE and Edge */
    scrollbar-width: none;  /* hide scrollbar in Firefox */
    &::-webkit-scrollbar {
        display: none;
    }
    &>* {
        width: 100%;
        flex-shrink: 0;
        flex-grow: 1;
    }
`
const LeftArrow = styled.button`
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: white;
    border: 1px solid #ddd;
    left: 24px;
`
const RightArrow = styled.button`
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: white;
    border: 1px solid #ddd;
    right: 24px;
`


const ActivityCarousel = (props) => {
    const { children } = props

    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)

    useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (currentIndex < (length - 1)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

  return (
    <CarouselContainer>
        <CarouselWrapper>

            <LeftArrow onClick={prev}>
                &lt;
            </LeftArrow>

            <CarouselContentWrapper>
                <CarouselContent 
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`
                    }}
                >
                    { children }
                </CarouselContent>
            </CarouselContentWrapper>

            <RightArrow onClick={next}>
                &gt;
            </RightArrow>

        </CarouselWrapper>        
    </CarouselContainer>
  )
}

export default ActivityCarousel
