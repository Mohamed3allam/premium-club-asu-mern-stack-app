import styled from "styled-components"
import { AttachMoney, ChatBubbleOutlineOutlined, Email, Equalizer, LineStyle, PersonOutline, RateReview, Report, Storefront, Timeline, TrendingUp, WorkOutlined, WebOutlined, Home, Group, Person, PersonAdd, ListAlt, ArrowDropDown, Cameraswitch, Campaign, TipsAndUpdates, Groups3, Handshake, RocketLaunch, CastForEducation, ArrowLeft, ArrowLeftOutlined, ArrowLeftRounded, ArrowRightRounded, ArrowRight } from "@mui/icons-material"
import {Link, useLocation} from 'react-router-dom'
import { useAuthContext } from "../../../App/hooks/useAuthContext"
import { useState, useEffect } from "react"
import { mobile } from "../../responsive"




const SidebarContainer = styled.div`
    background-color: whitesmoke;
    height: calc(100vh);
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    max-width: 280px;
    padding-top: 120px;

    ${mobile({
        width: 'fit-content',
        paddingTop:'100px',
        maxWidth : '100px',
        width : 'fit-content',
        paddingLeft : '10px',
        paddingRight : '10px'
    })}
`
const Wrapper = styled.div`
    padding: 20px;
    color: white;
    background-color: whitesmoke;
    position: relative;
`
const Menu = styled.div`
    margin-bottom: 10px;
    position: relative;
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

    ${mobile({
        display: 'none'
    })}
`
const SubListItemName = styled.span`
    margin: 0;
    display: inline;

    ${mobile({
        display: 'none'
    })}
`
const ToggleButton = styled.button`
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 2%;
    left: 50%;
    translate: -50%;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #555;
    color: white;
    z-index: 2;
    display: none;
    ${mobile({
        display: 'flex'
    })}
`

const Sidebar = ({ committees }) => {
    const { user } = useAuthContext()

    const [ expanded, setExpanded ] = useState(true)

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

        if (window.innerWidth < 768) {
            setExpanded(false)
        }
    }, [location])

    const handleWrap = () => {
        const listItems = document.getElementsByClassName('listItemName')

        const sidebarContainer = document.getElementById('sidebar-container')
        const sidebarWrapper = document.getElementById('sidebar-wrapper')
        if (expanded) {
            setExpanded(false)
            sidebarContainer.style.maxWidth = '100px'
            sidebarContainer.style.width = 'fit-content'
            sidebarWrapper.style.paddingLeft = '10px'
            sidebarWrapper.style.paddingRight = '10px'
            Object.values(listItems).map((listItem) => {
                listItem.style.visibility = 'invisible'
                listItem.style.opacity = 0
                listItem.style.display = 'none'
            })
        }
        if (!expanded) {
            setExpanded(true)
            sidebarContainer.style.maxWidth= '300px'
            sidebarContainer.style.width= '100%'
            sidebarWrapper.style.padding = '20px'
            Object.values(listItems).map((listItem) => {
                listItem.style.visibility = 'visible'
                listItem.style.opacity = 1
                listItem.style.display = 'unset'
            })
        }
    }

  return (
    <SidebarContainer id="sidebar-container">
        <Wrapper id="sidebar-wrapper">
            <div>
                <ToggleButton onClick={handleWrap}>
                    {
                        expanded ? (
                            <ArrowLeft />
                        ) : (
                            <ArrowRight />
                        )
                    }
                </ToggleButton>
                <Menu>
                    <Title>Dashboard</Title>
                    <List>
                        <Link to="" style={{textDecoration:'none'}}>
                            <ListItem>
                                <Home style={{marginRight:'5px',fontSize:'20px '}} />
                                <ListItemName className="listItemName">Home</ListItemName>
                            </ListItem>
                        </Link>
                        <Link to="website-edit" style={{textDecoration:'none'}}>
                            <ListItem>
                                <WebOutlined style={{marginRight:'5px',fontSize:'20px '}}/>
                                <ListItemName className="listItemName">Website</ListItemName>
                            </ListItem>
                        </Link>
                        <Link to="plans" style={{textDecoration:'none'}}>
                            <ListItem>
                                <ListAlt style={{marginRight:'5px',fontSize:'20px '}}/>
                                <ListItemName className="listItemName">Plans</ListItemName>
                            </ListItem>
                        </Link>
                    </List>
                </Menu>
                <Menu>
                    <Title>User {!expanded ? 'Ctrl' : 'Control'}</Title>
                    <List>
                        <Link to="users" style={{textDecoration:'none'}}>
                            <ListItem>
                                <Group style={{marginRight:'5px',fontSize:'20px '}}/>
                                <ListItemName className="listItemName">Users</ListItemName>
                            </ListItem>
                        </Link>
                        <Link to="newuser" style={{textDecoration:'none'}}>
                            <ListItem>
                                <PersonAdd style={{marginRight:'5px',fontSize:'20px '}}/>
                                <ListItemName className="listItemName">Add Member</ListItemName>
                            </ListItem>
                        </Link>
                    </List>
                </Menu>
                <Menu>
                    <Title>Committee {expanded && 'Tracking'}</Title>
                    <List>
                        {
                            committees && committees.map((committee, index) => (
                                <>
                                    <ListItem data-bs-toggle="collapse" href={`#multiCollapseExample${index}`} role="button" aria-expanded="false" aria-controls={`multiCollapseExample${index}`}  style={{display:'flex',flexDirection:'row',position:'relative'}}>
                                        <Cameraswitch style={{marginRight:'5px',fontSize:'20px '}}/>
                                        <ListItemName className="listItemName">{committee.committee_name}</ListItemName>
                                                <ArrowDropDown style={{position:'absolute', right:'5%'}} />
                                    </ListItem>
                                    <List className="collapse multi-collapse" id={`multiCollapseExample${index}`} style={{marginLeft:'2%'}}>
                                        <Link to={`/dashboard/${committee.committee_name.replace(/\s+/g, '-').toLowerCase()}/tasks-and-plans`} style={{textDecoration:'none'}}>
                                            <ListItem>
                                                <ListItemName className="listItemName">
                                                    Tasks And Plans
                                                </ListItemName>
                                            </ListItem>
                                        </Link>
                                    </List>
                                </>
                            ))
                        }
                        {/* MEDIA */}
                        

                    </List>
                </Menu>
            </div>
        </Wrapper>
    </SidebarContainer>
  )
}

export default Sidebar
