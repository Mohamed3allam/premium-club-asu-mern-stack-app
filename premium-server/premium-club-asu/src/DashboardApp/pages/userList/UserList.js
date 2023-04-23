import { Route, Routes } from "react-router-dom"
import styled from "styled-components"

import FilterNav from "./filterNav/FilterNav"
import AllUsers from "./allusers/AllUsers"
import Highboard from "./highboard/Highboard"
import Board from "./board/Board"
import Members from "./members/Members"
import Committees from "./committees/Committees"
import UserPage from "../user/UserPage"

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

const UserList = ({images}) => {
  console.log(window.location.href)
  return (
    <Container>
        <FilterNav />
        <Wrapper>
            <Routes>
                <Route index element={<AllUsers/>} />
                <Route path="highboard" element={<Highboard/>} />
                <Route path="board" element={<Board/>} />
                <Route path="members" element={<Members/>} />
                <Route path="committees/" element={<Committees/>}>
                    <Route path="*" element={<Committees/>} />
                </Route>
            </Routes>
        </Wrapper>
    </Container>
  )
}

export default UserList
