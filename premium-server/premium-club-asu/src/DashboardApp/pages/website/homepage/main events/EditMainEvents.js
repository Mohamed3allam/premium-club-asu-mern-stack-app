import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useHomeImgsContext } from '../../../../hooks/useHomeImgsContext'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import AllHomeImages from './AllHomeImages'
import { mobile } from '../../../../responsive'

const Container = styled.div`
    flex: 3;
`
const Wrapper = styled.div`
    position: relative;
    background-color: white;
    border-radius: 10px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); 
    height: fit-content;
    padding: 30px;
    margin: 20px;

    ${mobile({
        padding:'20px'
    })}
`
const MainEventsTitle = styled.h2`
  font-weight: bold;

  ${mobile({
    fontSize:'15px !important'
  })}
`


const EditMainEvents = () => {


  return (
    <>
      <Container>
        <Wrapper>
          <MainEventsTitle>Edit Main Events</MainEventsTitle>
          <AllHomeImages />
        </Wrapper>
      </Container>
    </>
  )
}

export default EditMainEvents
