import { Route, Routes } from "react-router-dom"
import styled from "styled-components"

import {  HomeContextProvider } from "../../context/HomePageContext"
import { HomeImgsContextProvider } from "../../context/HomePageImgsContext"
import { ActivityContextProvider } from "../../context/ActivityContext"

import CommitteeImgEdit from "./edit committee image/CommitteeImgEdit"
import ActivitiesEdit from "./activities/ActivitiesEdit"
import Background from "./background/Background"
import EventsEdit from "./events/EventsEdit"
import HomeEdit from "./homepage/HomeEdit"
import HrEdit from "./hr/HrEdit"
import LogisticsEdit from "./logistics/LogisticsEdit"
import MarketingEdit from "./marketing/MarketingEdit"
import MediaEdit from "./media/MediaEdit"
import PagesNav from "./pageNav/PagesNav"
import PrEdit from "./pr/PrEdit"
import { ActivityImgContextProvider } from "../../context/ActivityImgContext"

const Container = styled.div`
    flex: 5;
    height: 100%;
`
const Wrapper = styled.div`
    padding-top: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
`

const Website = ({images}) => {
  console.log(window.location.href)
  return (
    <HomeContextProvider>
      <HomeImgsContextProvider>

        <ActivityContextProvider>
          <ActivityImgContextProvider>

            <Container>
              <PagesNav />
              <Wrapper>
                <Routes>
                  <Route index element={<HomeEdit/>} />
                  <Route path="activities-edit" element={<ActivitiesEdit images={images}/>} />
                  <Route path="committee-edit" element={<CommitteeImgEdit/>} />
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
