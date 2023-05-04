import { Route, Routes } from "react-router-dom"
import styled from "styled-components"

import FilterNav from "./committeeNav/CommitteeNav"
import Media from "./Media"
import Marketing from "./Marketing"
import Events from "./Events"
import HR from "./HR"
import PR from "./PR"
import Logistics from "./Logistics"
import Academic from "./Academic"

const Container = styled.div`
    height: 100%;
`
const Wrapper = styled.div`
    padding-top: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
`

const Committees = ({committeeMembers}) => {
  console.log(window.location.href)
  return (
    <Container>
        <FilterNav />
        <Wrapper>
            <Routes>
                <Route index element={<Media users={committeeMembers.media}/>} />
                <Route path="marketing" element={<Marketing users={committeeMembers.marketing}/>} />
                <Route path="events" element={<Events users={committeeMembers.events}/>} />
                <Route path="human-resources" element={<HR users={committeeMembers.hr}/>} />
                <Route path="public-relations" element={<PR users={committeeMembers.pr}/>} />
                <Route path="logistics" element={<Logistics users={committeeMembers.logistics}/>} />
                <Route path="academic" element={<Academic users={committeeMembers.academic}/>} />
            </Routes>
        </Wrapper>
    </Container>
  )
}

export default Committees
