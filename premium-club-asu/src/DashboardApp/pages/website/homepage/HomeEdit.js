import React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { HomeContextProvider } from '../../../context/HomePageContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useHomeContext } from '../../../hooks/useHomeContext'
import Background from '../background/Background'
import AllSections from './all sections/AllSections'
import EditMainEvents from './main events/EditMainEvents'
import NewSection from './newsection/NewSection'

const Container = styled.div`
  display: flex;
  flex: 3;
  flex-direction: row;
  margin: 20px;
`
const HomeEdit = () => {

  const {sections,dispatch} = useHomeContext();
  const { user } = useAuthContext();

  useEffect(() => {
      const fetchSections = async () => {
          const response = await fetch('/home-api/sections', {
              headers: {
                  "Authorization": `Bearer ${user.token}`
              }
          })
          const json = await response.json()
          if (response.ok) {
              dispatch({type: 'SET_SECTIONS', payload:json})
          }
      }

      if (user) {
          fetchSections()
      }
  }, [dispatch, user])

  useEffect(() => {
    const roles = [ 'Vice President','President', 'Head']

    console.log(roles.indexOf(user.role))
  })

  return (
    <>
      {/* <Background /> */}
      <Container>
        <div style={{flex:'3'}}>
          {
            sections && sections.map((section)=>(
              <AllSections key={section._id} section={section} />
            ))
          }
        </div>
        <NewSection />
      </Container>
      <EditMainEvents />
    </>
  )
}

export default HomeEdit
