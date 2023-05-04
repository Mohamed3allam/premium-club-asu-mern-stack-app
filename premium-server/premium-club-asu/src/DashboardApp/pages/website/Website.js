import { Route, Routes } from "react-router-dom"
import styled from "styled-components"

import {  HomeContextProvider } from "../../context/HomePageContext"
import { HomeImgsContextProvider } from "../../context/HomePageImgsContext"
import { ActivityContextProvider } from "../../context/ActivityContext"

import ActivitiesEdit from "./activities/ActivitiesEdit"
import HomeEdit from "./homepage/HomeEdit"
import PagesNav from "./pageNav/PagesNav"
import { ActivityImgContextProvider } from "../../context/ActivityImgContext"
import CommitteeControl from "./edit committee image/CommitteeControl"
import { mobile } from "../../responsive"

const Container = styled.div`
    flex: 5;
    height: 100%;
    width: 100%;
    max-width: 1400px !important;
    
    ${mobile({
      maxWidth:'768px !important',
      paddingTop:'30px'
    })}
`
const Wrapper = styled.div`
    padding-top: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
`

const Website = ({websiteData, images}) => {
  console.log(window.location.href)
  return (
    <HomeContextProvider>
      <HomeImgsContextProvider>

        <ActivityContextProvider>
          <ActivityImgContextProvider>

            <Container>
              <Wrapper>
                <PagesNav />
                <Routes>
                  <Route index element={<HomeEdit sections={websiteData.sections} />} />
                  <Route path="activities-edit" element={<ActivitiesEdit activities={websiteData.activities} images={images}/>} />
                  <Route path="committee-edit" element={<CommitteeControl committees={websiteData.committees}/>} >
                    <Route path="*" element={<CommitteeControl committees={websiteData.committees}/>} />
                  </Route>
                </Routes>
              </Wrapper>
            </Container>

          </ActivityImgContextProvider>
        </ActivityContextProvider>
        
      </HomeImgsContextProvider>
    </HomeContextProvider>
  )
}

export default Website
