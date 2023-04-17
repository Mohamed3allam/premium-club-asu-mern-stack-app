import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useHomeImgsContext } from '../../../../hooks/useHomeImgsContext'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import AllHomeImages from './AllHomeImages'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10%;
  /* margin: 20px; */
`
const Wrapper = styled.div`
    width: 100%;
    position: relative;
    background-color: white;
    border-radius: 10px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); 
    padding: 30px;
    margin: 20px;
    display: flex;
    flex-direction: column;
`
const MainEventsTitle = styled.h2`
  font-weight: bold;
`


const EditMainEvents = () => {


  return (
    <>
      <Container>
        <Wrapper>
          <MainEventsTitle>Edit Main Events</MainEventsTitle>
          <AllHomeImages />
          {/* <NewHomeImg /> */}
        </Wrapper>
      </Container>
    </>
  )
}

export default EditMainEvents
