import styled from 'styled-components'
import {NotificationsNone, Language, Settings, Logout, Home} from '@mui/icons-material';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { mobile } from '../../responsive';

const PremiumLogo = styled.img`
    ${mobile({
        width: '50px'
    })}
`
const PremiumName = styled.h3`
    font-weight: bold;
    white-space: nowrap;

    ${mobile({
        fontSize:'15px !important',
    })}
`
const TopbarAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`
const Nav = styled.div`
    min-width: 90vw;
    max-width: 100vw;
    height: fit-content;
    background-color: white ;
    top: 0;
    z-index: 99999;
    padding: 0px 30px;
    display: flex;
    flex-direction: row;

    ${mobile({
      paddingBottom: '20px'
    })}
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
    <Nav className="navbar navbar-expand-lg navbar-light pt-3 w-100 position-fixed" id="navbar" >
        
        <div className='container-fluid' style={{display:'flex',flexDirection:'row',justifyContent:'unset',width:'max-content',margin:'0'}}>
            <PremiumLogo src={images['premiumClubLogo b.png']} alt="premiumClubLogo" className="navBarLogo" id="premiumLogo" />
            <PremiumName>Premium Dashboard</PremiumName>
        </div>
        {/* <div class="">
            <a class="navbar-brand" href="#">
                <img src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top" />
                Bootstrap
            </a>
        </div> */}
            <button className="navbar-toggler ml-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav  ml-auto mr-5">
                    <li className="nav-item">
                        <Link className={`nav-link`} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link`} to="/activities">Activities</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link`} to="/">Website</Link>
                    </li>
                    <li>
                        <Link to='/dashboard/profile' style={{textDecoration:'none', color:'gray'}}>
                            <TopbarAvatar style={{backgroundImage:`url('${images['defaultPP.jpg']}')`}} src={PPisLoading ? images['defaultPP.jpg'] : user.user.profilePicUrl}/>
                        </Link>
                    </li>
                </ul>
            </div>
    </Nav>
  )
}

export default Topbar
