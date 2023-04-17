import { Visibility } from "@mui/icons-material"
import styled from "styled-components"

const Container = styled.div`
    flex: 1;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47); 
    padding: 20px;
    margin-right: 20px;
`
const WidgetSmTitle = styled.span`
    font-size: 22px;
    font-weight: 600;
`
const WidgetSmList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`
const WidgetSmListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0px;
`
const WidgetSmImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`
const WidgetSmUser = styled.div`
    display: flex;
    flex-direction: column;
`
const WidgetSmUsername = styled.span`
    font-weight: 600;
`
const WidgetSmUserTitle = styled.span`
    font-weight: 300;
`
const WidgetSmButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    border-radius: 10px;
    padding: 7px 10px;
    background-color: #eeeef7;
    color: #555;
    cursor: pointer;
`

const WidgetSm = () => {
  return (
    <Container>
        <WidgetSmTitle>New Joined Members</WidgetSmTitle>
        <WidgetSmList>
            <WidgetSmListItem>
                <WidgetSmImg src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                <WidgetSmUser>
                    <WidgetSmUsername>Anna Keller</WidgetSmUsername>
                    <WidgetSmUserTitle>Software Engineer</WidgetSmUserTitle>
                </WidgetSmUser>
                <WidgetSmButton>
                    <Visibility style={{fontSize:'16px', marginRight:'5px'}} /> Display
                </WidgetSmButton>
            </WidgetSmListItem>
            <WidgetSmListItem>
                <WidgetSmImg src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                <WidgetSmUser>
                    <WidgetSmUsername>Anna Keller</WidgetSmUsername>
                    <WidgetSmUserTitle>Software Engineer</WidgetSmUserTitle>
                </WidgetSmUser>
                <WidgetSmButton>
                    <Visibility style={{fontSize:'16px', marginRight:'5px'}} /> Display
                </WidgetSmButton>
            </WidgetSmListItem>
            <WidgetSmListItem>
                <WidgetSmImg src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                <WidgetSmUser>
                    <WidgetSmUsername>Anna Keller</WidgetSmUsername>
                    <WidgetSmUserTitle>Software Engineer</WidgetSmUserTitle>
                </WidgetSmUser>
                <WidgetSmButton>
                    <Visibility style={{fontSize:'16px', marginRight:'5px'}} /> Display
                </WidgetSmButton>
            </WidgetSmListItem>
            <WidgetSmListItem>
                <WidgetSmImg src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                <WidgetSmUser>
                    <WidgetSmUsername>Anna Keller</WidgetSmUsername>
                    <WidgetSmUserTitle>Software Engineer</WidgetSmUserTitle>
                </WidgetSmUser>
                <WidgetSmButton>
                    <Visibility style={{fontSize:'16px', marginRight:'5px'}} /> Display
                </WidgetSmButton>
            </WidgetSmListItem>
            <WidgetSmListItem>
                <WidgetSmImg src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
                <WidgetSmUser>
                    <WidgetSmUsername>Anna Keller</WidgetSmUsername>
                    <WidgetSmUserTitle>Software Engineer</WidgetSmUserTitle>
                </WidgetSmUser>
                <WidgetSmButton>
                    <Visibility style={{fontSize:'16px', marginRight:'5px'}} /> Display
                </WidgetSmButton>
            </WidgetSmListItem>
        </WidgetSmList>
    </Container>
  )
}

export default WidgetSm
