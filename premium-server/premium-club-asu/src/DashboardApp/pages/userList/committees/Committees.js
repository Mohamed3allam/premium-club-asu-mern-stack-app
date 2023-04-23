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

const Committees = () => {
  console.log(window.location.href)
  return (
    <Container>
        <FilterNav />
        <Wrapper>
            <Routes>
                <Route index element={<Media/>} />
                <Route path="marketing" element={<Marketing/>} />
                <Route path="events" element={<Events/>} />
                <Route path="human-resources" element={<HR/>} />
                <Route path="public-relations" element={<PR/>} />
                <Route path="logistics" element={<Logistics/>} />
                <Route path="academic" element={<Academic/>} />
            </Routes>
        </Wrapper>
    </Container>
  )
}

export default Committees
