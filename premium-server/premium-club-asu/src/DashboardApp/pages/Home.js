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
import config from "../../config"
import { mobile } from "../responsive"

const Container = styled.div`
    flex: 5;
    height: 100%;
    width: 100%;
    max-width: 1400px !important;
`
const Wrapper = styled.div`
    padding: 10px;
    background-color: white;
    height: 100%;

`
const HomeWidgets = styled.div`
    display: flex;
    margin: 20px;

    ${mobile({
      flexDirection:'column'
    })}
`
const Home = ({ users }) => {
  const { user } = useAuthContext()

  const premiumApi = config.premiumApi

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
          <Chart data={userData} title="Committee Evaluation" grid dataKey="Active User"/>
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
