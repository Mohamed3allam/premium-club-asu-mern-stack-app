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
    width: 100%;
    max-width: 1400px !important;
`
const Wrapper = styled.div`
    padding-top: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
`

const UserList = ({users, highboard, board, members, committeeMembers}) => {
  console.log(window.location.href)
  return (
    <Container>
        <FilterNav />
        <Wrapper>
            <Routes>
                <Route index element={<AllUsers users={users}/>} />
                <Route path="highboard" element={<Highboard users={highboard}/>} />
                <Route path="board" element={<Board users={board} />} />
                <Route path="members" element={<Members users={members} />} />
                <Route path="committees/" element={<Committees committeeMembers={committeeMembers}/>}>
                    <Route path="*" element={<Committees committeeMembers={committeeMembers}/>} />
                </Route>
            </Routes>
        </Wrapper>
    </Container>
  )
}

export default UserList
