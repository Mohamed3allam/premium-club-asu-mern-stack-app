import styled from 'styled-components'
import {NotificationsNone, Language, Settings, Logout, Home} from '@mui/icons-material';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

const TopbarContainer = styled.div`
    min-width: 100%;
    height: 100px;
    background-color: white ;
    position: sticky;
    top: 0;
    z-index: 99999;
`
const TopbarWrapper = styled.div`
    display: flex;
    height: 100%;
    padding: 0 20px;
    align-items: center;
    justify-content: space-between;
`
const TopbarLeft = styled.div``
const TopbarRight = styled.div`
    display: flex;
    align-items: center;
`
const TopbarIconContainer = styled.div`
    position: relative;
    cursor: pointer;
    margin-right: 10px;
    color: #555;
    font-size: 20px;
`
const TopIconBag = styled.span`
    position: absolute;
    top: -5px;
    right: 0px;
    width: 20px;
    height: 20px;
    background-color: red;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
`
const TopbarAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`
const Logo = styled.span`
    font-weight: bold;
    font-size:30px;
    color: black;
    cursor: pointer;
`

const Topbar = ({images}) => {
    const { user } = useAuthContext()
    

    const [PPisLoading, setPPisLoading] = useState(true)


    useEffect(()=> {
        const checkPPLoading = setInterval(()=>{
            if (document.readyState === 'complete') {
                setPPisLoading(false)
                clearInterval(checkPPLoading)
            }
        })
        console.log(user.user.profilePicUrl)
    })
  return (
    <TopbarContainer>
      <TopbarWrapper>

        <TopbarLeft>
            <Logo>
            <img src={images['premiumClubLogo b.png']} alt="premiumClubLogo" className="navBarLogo" id="premiumLogo" />
                Premium Dashboard
            </Logo>
        </TopbarLeft>

        <TopbarRight>
            <TopbarIconContainer>
                <NotificationsNone />
                <TopIconBag>2</TopIconBag>
            </TopbarIconContainer>
            <TopbarIconContainer>
                <Language />
            </TopbarIconContainer>
            <TopbarIconContainer>
                <Settings />
            </TopbarIconContainer>
            <TopbarIconContainer>
                <Link to='/'>
                    Website
                </Link>
            </TopbarIconContainer>
            <TopbarIconContainer>
                <Link to='/' style={{textDecoration:'none', color:'gray'}}>
                    <TopbarAvatar style={{backgroundImage:`url('${images['defaultPP.jpg']}')`}} src={PPisLoading ? images['defaultPP.jpg'] : user.user.profilePicUrl}/>
                    Profile
                </Link>
            </TopbarIconContainer>
        </TopbarRight>

      </TopbarWrapper>
    </TopbarContainer>
  )
}

export default Topbar
