import styled from "styled-components"
import { AttachMoney, ChatBubbleOutlineOutlined, Email, Equalizer, LineStyle, PersonOutline, RateReview, Report, Storefront, Timeline, TrendingUp, WorkOutlined, WebOutlined, Home, Group, Person, PersonAdd, ListAlt, ArrowDropDown, Cameraswitch, Campaign, TipsAndUpdates, Groups3, Handshake, RocketLaunch, CastForEducation, ArrowLeft, ArrowLeftOutlined, ArrowLeftRounded, ArrowRightRounded } from "@mui/icons-material"
import {Link, useLocation} from 'react-router-dom'
import { useAuthContext } from "../../../App/hooks/useAuthContext"
import { useState, useEffect } from "react"
import { mobile } from "../../responsive"




const SidebarContainer = styled.div`
    flex: 1;
    background-color: whitesmoke;
    height: calc(110vh);
    min-height: max-content;
    position: sticky;
    top: 50px;
`
const Wrapper = styled.div`
    padding: 20px;
    color: white;
    background-color: whitesmoke;

`
const Menu = styled.div`
    margin-bottom: 10px;
`
const Title = styled.h3`
    font-size: 13px;
    color: rgb(189,189,189);
`
const List = styled.ul`
    list-style: none;
    padding: 5px;
`
const ListItem = styled.li`
    color: #555 !important;
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;
    background-color: ${props=>props.className === 'active' ? '#c9c9dc' : 'none'};

    &:hover {
        background-color: #c9c9dc;
    }
`
const ListItemName = styled.span`
    margin: 0;
    display: inline;
    overflow-x: hidden;
`
const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 1%;
    bottom: 1%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #555;
    color: white;
`

const Sidebar = () => {
    const { user } = useAuthContext()


    const [isPresident, setIsPresident] = useState(false)
    const [isVicePresident, setIsVicePresident] = useState(false)
    const [isHead, setIsHead] = useState(false)
    const [isViceHead, setIsViceHead] = useState(false)
    const [isMember, setIsMember] = useState(false)

    const [isMedia, setIsMedia] = useState(false)
    const [isMarketing, setIsMarketing] = useState(false)
    const [isEvents, setIsEvents] = useState(false)
    const [isPR, setIsPR] = useState(false)
    const [isHR, setIsHR] = useState(false)
    const [isLogistics, setIsLogistics] = useState(false)
    const [isAcademic, setIsAcademic] = useState(false)

    // const [sidebarWrapped, setSidebarWrapped] = useState(false)

    // const handleWrap = () => {
    //     if (sidebarWrapped === true) {
    //         setSidebarWrapped(false)
    //     } else {
    //         setSidebarWrapped(true)
    //     }
    // }
    const location = useLocation()
    useEffect(()=> {

        console.log(user.user.role, user.user.committee)
        if (user.user.role === 'President') {
            setIsPresident(true)
            setIsVicePresident(false)
            setIsHead(false)
            setIsViceHead(false)
            setIsMember(false)
        } else if (user.user.role === 'Vice President') {
            setIsVicePresident(true)
            setIsPresident(false)
            setIsHead(false)
            setIsViceHead(false)
            setIsMember(false)
        } else if (user.user.role === 'Head') {
            setIsHead(true)
            setIsPresident(false)
            setIsVicePresident(false)
            setIsViceHead(false)
            setIsMember(false)
        } else if (user.user.role === 'Vice Head') {
            setIsViceHead(true)
            setIsPresident(false)
            setIsVicePresident(false)
            setIsHead(false)
            setIsMember(false)
        } else if (user.user.role === 'Member') {
            setIsMember(true)
            setIsPresident(false)
            setIsVicePresident(false)
            setIsHead(false)
            setIsViceHead(false)
        }

        if (user.user.committee === 'Media') {
            setIsMedia(true)
            setIsMarketing(false)
            setIsEvents(false)
            setIsPR(false)
            setIsHR(false)
            setIsLogistics(false)
            setIsAcademic(false)
        } else if (user.user.committee === 'Marketing') {
            setIsMarketing(true)
            setIsMedia(false)
            setIsEvents(false)
            setIsPR(false)
            setIsHR(false)
            setIsLogistics(false)
            setIsAcademic(false)
        } else if (user.user.committee === 'Events') {
            setIsEvents(true)
            setIsMedia(false)
            setIsMarketing(false)
            setIsPR(false)
            setIsHR(false)
            setIsLogistics(false)
            setIsAcademic(false)
        } else if (user.user.committee === 'Public Relations') {
            setIsPR(true)
            setIsMedia(false)
            setIsMarketing(false)
            setIsEvents(false)
            setIsHR(false)
            setIsLogistics(false)
            setIsAcademic(false)
        } else if (user.user.committee === 'Human Resources') {
            setIsHR(true)
            setIsMedia(false)
            setIsMarketing(false)
            setIsEvents(false)
            setIsPR(false)
            setIsLogistics(false)
            setIsAcademic(false)
        } else if (user.user.committee === 'Logistics') {
            setIsLogistics(true)
            setIsMedia(false)
            setIsMarketing(false)
            setIsEvents(false)
            setIsPR(false)
            setIsHR(false)
            setIsAcademic(false)
        } else if (user.user.committee === 'Academic') {
            setIsAcademic(true)
            setIsMedia(false)
            setIsMarketing(false)
            setIsEvents(false)
            setIsPR(false)
            setIsHR(false)
            setIsLogistics(false)
        }
    }, [location])


  return (
    <SidebarContainer>
        <Wrapper>
            <Menu>
                <Title>Dashboard</Title>
                <List>
                    <Link to="" style={{textDecoration:'none'}}>
                        <ListItem>
                            <Home style={{marginRight:'5px',fontSize:'20px '}} />
                            <ListItemName>Home</ListItemName>
                        </ListItem>
                    </Link>
                    <Link to="website-edit" style={{textDecoration:'none'}}>
                        <ListItem>
                            <WebOutlined style={{marginRight:'5px',fontSize:'20px '}}/>
                            <ListItemName>Website</ListItemName>
                        </ListItem>
                    </Link>
                    <Link to="plans" style={{textDecoration:'none'}}>
                        <ListItem>
                            <ListAlt style={{marginRight:'5px',fontSize:'20px '}}/>
                            <ListItemName>Plans</ListItemName>
                        </ListItem>
                    </Link>
                </List>
            </Menu>
            <Menu>
                <Title>User Control</Title>
                <List>
                    <Link to="users" style={{textDecoration:'none'}}>
                        <ListItem>
                            <Group style={{marginRight:'5px',fontSize:'20px '}}/>
                            Users
                        </ListItem>
                    </Link>
                    <Link to="newuser" style={{textDecoration:'none'}}>
                        <ListItem>
                            <PersonAdd style={{marginRight:'5px',fontSize:'20px '}}/>
                            Add Member
                        </ListItem>
                    </Link>
                </List>
            </Menu>
            <Menu>
                <Title>Committee Tracking</Title>
                <List>
                    {/* MEDIA */}
                    <ListItem data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1"  style={{display:'flex',flexDirection:'row',position:'relative'}}>
                        <Cameraswitch style={{marginRight:'5px',fontSize:'20px '}}/>
                        <ListItemName>Media</ListItemName>
                        <ArrowDropDown style={{position:'absolute', right:'5%'}} />
                    </ListItem>
                    <List className="collapse multi-collapse" id="multiCollapseExample1" style={{marginLeft:'2%'}}>
                        <Link to="plans" style={{textDecoration:'none'}}>
                            <ListItem>
                                <ListItemName>
                                    Tasks And Plans
                                </ListItemName>
                            </ListItem>
                        </Link>
                    </List>

                    {/* MARKETING */}
                    <ListItem data-bs-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample2"  style={{display:'flex',flexDirection:'row',position:'relative'}}>
                        <Campaign style={{marginRight:'5px',fontSize:'20px '}}/>
                        <ListItemName>Marketing</ListItemName>
                        <ArrowDropDown style={{position:'absolute', right:'5%'}} />
                    </ListItem>
                    <List className="collapse multi-collapse" id="multiCollapseExample2" style={{marginLeft:'2%'}}>
                        <Link to="plans" style={{textDecoration:'none'}}>
                            <ListItem>
                                <ListItemName>
                                    Tasks And Plans
                                </ListItemName>
                            </ListItem>
                        </Link>
                    </List>


                    {/* EVENTS */}
                    <ListItem data-bs-toggle="collapse" href="#multiCollapseExample3" role="button" aria-expanded="false" aria-controls="multiCollapseExample3"  style={{display:'flex',flexDirection:'row',position:'relative'}}>
                        <TipsAndUpdates style={{marginRight:'5px',fontSize:'20px '}}/>
                        <ListItemName>Events</ListItemName>
                        <ArrowDropDown style={{position:'absolute', right:'5%'}} />
                    </ListItem>
                    <List className="collapse multi-collapse" id="multiCollapseExample3" style={{marginLeft:'2%'}}>
                        <Link to="plans" style={{textDecoration:'none'}}>
                            <ListItem>
                                <ListItemName>
                                    Tasks And Plans
                                </ListItemName>
                            </ListItem>
                        </Link>
                    </List>


                    {/* HUMAN RESOURCES */}
                    <ListItem data-bs-toggle="collapse" href="#multiCollapseExample4" role="button" aria-expanded="false" aria-controls="multiCollapseExample4"  style={{display:'flex',flexDirection:'row',position:'relative'}}>
                        <Groups3 style={{marginRight:'5px',fontSize:'20px '}}/>
                        <ListItemName>Human Resources</ListItemName>
                        <ArrowDropDown style={{position:'absolute', right:'5%'}} />
                    </ListItem>
                    <List className="collapse multi-collapse" id="multiCollapseExample4" style={{marginLeft:'2%'}}>
                        <Link to="plans" style={{textDecoration:'none'}}>
                            <ListItem>
                                <ListItemName>
                                    Tasks And Plans
                                </ListItemName>
                            </ListItem>
                        </Link>
                    </List>


                    {/* PUBLIC RELATIONS */}
                    <ListItem data-bs-toggle="collapse" href="#multiCollapseExample5" role="button" aria-expanded="false" aria-controls="multiCollapseExample5"  style={{display:'flex',flexDirection:'row',position:'relative'}}>
                        <Handshake style={{marginRight:'5px',fontSize:'20px '}}/>
                        <ListItemName>Public Relations</ListItemName>
                        <ArrowDropDown style={{position:'absolute', right:'5%'}} />
                    </ListItem>
                    <List className="collapse multi-collapse" id="multiCollapseExample5" style={{marginLeft:'2%'}}>
                        <Link to="plans" style={{textDecoration:'none'}}>
                            <ListItem>
                                <ListItemName>
                                    Tasks And Plans
                                </ListItemName>
                            </ListItem>
                        </Link>
                    </List>


                    {/* LOGISTICS */}
                    <ListItem data-bs-toggle="collapse" href="#multiCollapseExample6" role="button" aria-expanded="false" aria-controls="multiCollapseExample6"  style={{display:'flex',flexDirection:'row',position:'relative'}}>
                        <RocketLaunch style={{marginRight:'5px',fontSize:'20px '}}/>
                        <ListItemName>Logistics</ListItemName>
                        <ArrowDropDown style={{position:'absolute', right:'5%'}} />
                    </ListItem>
                    <List className="collapse multi-collapse" id="multiCollapseExample6" style={{marginLeft:'2%'}}>
                        <Link to="plans" style={{textDecoration:'none'}}>
                            <ListItem>
                                <ListItemName>
                                    Tasks And Plans
                                </ListItemName>
                            </ListItem>
                        </Link>
                    </List>


                    {/* ACADEMIC */}
                    <ListItem data-bs-toggle="collapse" href="#multiCollapseExample7" role="button" aria-expanded="false" aria-controls="multiCollapseExample7"  style={{display:'flex',flexDirection:'row',position:'relative'}}>
                        <CastForEducation style={{marginRight:'5px',fontSize:'20px '}}/>
                        <ListItemName>Academic</ListItemName>
                        <ArrowDropDown style={{position:'absolute', right:'5%'}} />
                    </ListItem>
                    <List className="collapse multi-collapse" id="multiCollapseExample7" style={{marginLeft:'2%'}}>
                        <Link to="plans" style={{textDecoration:'none'}}>
                            <ListItem>
                                <ListItemName>
                                    Tasks And Plans
                                </ListItemName>
                            </ListItem>
                        </Link>
                    </List>
                </List>
            </Menu>
            <Menu>
                <Title>Staff</Title>
                <List>
                    <ListItem>
                        <WorkOutlined style={{marginRight:'5px',fontSize:'20px '}}/>
                        Manage
                    </ListItem>
                    <ListItem>
                        <Timeline style={{marginRight:'5px',fontSize:'20px '}}/>
                        Analytics
                    </ListItem>
                    <ListItem>
                        <Report style={{marginRight:'5px',fontSize:'20px '}}/>
                        Reports
                    </ListItem>
                </List>
            </Menu>
        </Wrapper>
        {/* <Button onClick={handleWrap}>
            <ArrowLeftRounded style={{width:'40px',height:'40px'}} />
            <ArrowRightRounded style={{width:'40px',height:'40px'}} />
        </Button> */}
    </SidebarContainer>
  )
}

export default Sidebar
