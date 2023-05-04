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
import config from '../../../../config'
import { mobile } from '../../../responsive'

const Container = styled.div`
  display: flex;
  flex: 3;
  flex-direction: row;
  margin: 20px;

  ${mobile({
    flexDirection:'column-reverse',
    margin:'0px'
  })}
`
const HomeEdit = ({ sections }) => {

  const { user } = useAuthContext();

  const premiumApi = config.premiumApi

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
