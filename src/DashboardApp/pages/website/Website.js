import { Route, Routes } from "react-router-dom"
import styled from "styled-components"

import {  HomeContextProvider } from "../../context/HomePageContext"
import { HomeImgsContextProvider } from "../../context/HomePageImgsContext"
import { ActivityContextProvider } from "../../context/ActivityContext"

import AcademicEdit from "./academic/AcademicEdit"
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

const Website = () => {
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
                  <Route path="activities-edit" element={<ActivitiesEdit/>} />
                  <Route path="media-edit" element={<MediaEdit/>} />
                  <Route path="marketing-edit" element={<MarketingEdit/>} />
                  <Route path="events-edit" element={<EventsEdit/>} />
                  <Route path="hr-edit" element={<HrEdit/>} />
                  <Route path="pr-edit" element={<PrEdit/>} />
                  <Route path="logistics-edit" element={<LogisticsEdit/>} />
                  <Route path="academic-edit" element={<AcademicEdit/>} />
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
