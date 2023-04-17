import { Helmet } from "react-helmet"
import styled from "styled-components"
import Chart from "../components/charts/Chart"
import FeaturedInfo from "../components/featuredinfo/FeaturedInfo"
import WidgetLg from "../components/widgetLg/WidgetLg"
import WidgetSm from "../components/widgetSm/WidgetSm"
import { userData } from "../dummyData"
import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useUsersContext } from "../hooks/useUsersContext"

const Container = styled.div`
    flex: 5;
`
const Wrapper = styled.div`
    padding-top: 10px;
    background-color: white;
    height: 100%;
    box-shadow: 5px 0 15px black !important;
`
const HomeWidgets = styled.div`
    display: flex;
    margin: 20px;
`
const Home = () => {
  const { user } = useAuthContext()
  const { users, dispatch } = useUsersContext()

  useEffect(() => {
    
    const fetchAllUsers = async () => {
      const response = await fetch('/users/allusers', {
        method:'GET',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({type:'SET_USERS', payload: json})
      }
    }
    user && fetchAllUsers();
    
  }, [ user, dispatch ])

  console.log(window.location.href)
  return (
    <>
      <Container>
        <Wrapper>
          {
            users && (
              <FeaturedInfo users={users}/>
            )
          }
          <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
          <HomeWidgets>
              <WidgetSm/>
              <WidgetLg/>
          </HomeWidgets>
        </Wrapper>
      </Container>
    </>
  )
}

export default Home
