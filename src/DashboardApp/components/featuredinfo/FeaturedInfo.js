import styled from "styled-components"
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'

const Featured = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
const FeaturedItem = styled.div`
    flex: 1;
    margin: 0 20px;
    padding: 30px;
    border-radius: 10px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); 
`
const FeaturedTitle = styled.span`
    font-size: 20px;
`
const FeaturedMoneyContainer = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
`
const FeaturedMoney = styled.span`
    font-size: 35px;
    font-weight: 600;
`
const FeaturedMoneyRate = styled.span`
    display: flex;
    align-items: center;
    margin-left: 20px;
`
const FeaturedSub = styled.span`
    font-size: 15px;
    color: gray;
`


const FeaturedInfo = ({users}) => {
  return (
    <Featured>
        <FeaturedItem>
            <FeaturedTitle>
                Premium Members
            </FeaturedTitle>
            <FeaturedMoneyContainer>
                <FeaturedMoney>{users.length}</FeaturedMoney>
            </FeaturedMoneyContainer>
            <FeaturedSub>for the year 2022-2023</FeaturedSub>
        </FeaturedItem>
        <FeaturedItem>
            <FeaturedTitle>
                Premium Members
            </FeaturedTitle>
            <FeaturedMoneyContainer>
                <FeaturedMoney>{users.length}</FeaturedMoney>
            </FeaturedMoneyContainer>
            <FeaturedSub>for the year 2022-2023</FeaturedSub>
        </FeaturedItem>
        <FeaturedItem>
            <FeaturedTitle>
                Premium Members
            </FeaturedTitle>
            <FeaturedMoneyContainer>
                <FeaturedMoney>{users.length}</FeaturedMoney>
            </FeaturedMoneyContainer>
            <FeaturedSub>for the year 2022-2023</FeaturedSub>
        </FeaturedItem>
    </Featured>
  )
}

export default FeaturedInfo
