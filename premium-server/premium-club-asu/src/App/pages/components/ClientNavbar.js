import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';

// STYLES
const Nav = styled.nav`
    background-image: linear-gradient(to bottom, rgba(0,0,0) ,rgba(0,0,0,0.9),rgba(0,0,0,0.7),rgba(0,0,0,0.5),  transparent);
    position: fixed;
    background: brightness(50%);
    min-height: 120px;
    z-index: 4;
    padding: 0 9%;
`
const ClientNavbar = ({images}) => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const [home, setHome] = useState(false)
    const [activities, setActivities] = useState(false)
    const [crew, setCrew] = useState(false)
    const [committees, setCommittees] = useState(false)
    const [login, setLogin] = useState(false)

    const [media, setMedia] = useState(false)
    const [marketing, setMarketing] = useState(false)
    const [hr, setHr] = useState(false)
    const [pr, setPr] = useState(false)
    const [ac, setAc] = useState(false)
    const [logistics, setLogistics] = useState(false)
    const [events, setEvents] = useState(false)

    const [PPisLoading, setPPisLoading] = useState(true)


    const location = useLocation()

    useEffect(()=>{
        console.log(location.pathname)
        if (location.pathname === '/') {
            setHome(true)
            setActivities(false)
            setCrew(false)
            setCommittees(false)
            setLogin(false)
        } else if (location.pathname === '/activities') {
            setActivities(true)
            setHome(false)
            setCrew(false)
            setCommittees(false)
            setLogin(false)
        } else if (location.pathname ===('/crew')) {
            setCrew(true)
            setHome(false)
            setActivities(false)
            setCommittees(false)
            setLogin(false)
        } else if (location.pathname.includes('/committees')) {
            setCommittees(true)
            setHome(false)
            setActivities(false)
            setCrew(false)
            setLogin(false)
            if (location.pathname === ('/committees/media')) {
                setMedia(true)
                setMarketing(false)
                setAc(false)
                setEvents(false)
                setLogistics(false)
                setPr(false)
                setHr(false)
            } else if (location.pathname === ('/committees/marketing')) {
                setMarketing(true)
                setMedia(false)
                setAc(false)
                setEvents(false)
                setLogistics(false)
                setPr(false)
                setHr(false)
            } else if (location.pathname === ('/committees/academic')) {
                setAc(true)
                setMarketing(false)
                setMedia(false)
                setEvents(false)
                setLogistics(false)
                setPr(false)
                setHr(false)
            } else if (location.pathname === ('/committees/human-resources')) {
                setHr(true)
                setMarketing(false)
                setMedia(false)
                setAc(false)
                setEvents(false)
                setLogistics(false)
                setPr(false)
            } else if (location.pathname === ('/committees/public-relations')) {
                setPr(true)
                setMarketing(false)
                setMedia(false)
                setAc(false)
                setEvents(false)
                setLogistics(false)
                setHr(false)
            } else if (location.pathname === ('/committees/logistics')) {
                setLogistics(true)
                setMarketing(false)
                setMedia(false)
                setAc(false)
                setEvents(false)
                setPr(false)
                setHr(false)
            } else if (location.pathname === ('/committees/events')) {
                setEvents(true)
                setMarketing(false)
                setMedia(false)
                setAc(false)
                setLogistics(false)
                setPr(false)
                setHr(false)
            }

        } else if (location.pathname === ('/login')) {
            setLogin(true)
            setHome(false)
            setActivities(false)
            setCrew(false)
            setCommittees(false)
        }

        const checkPPLoading = setInterval(()=>{
            if (document.readyState === 'complete') {
                setPPisLoading(false)
                clearInterval(checkPPLoading)
            }
        })

    }, [location])


    const handleLogout = () => {
        logout()
    }

  return (
    <>
    <Nav className="navbar navbar-expand-lg navbar-dark pt-3  position-fixed w-100" id="navbar" >
        
        <div className="container">
            <div className="specialThanks">
                <div className="thanksArrowDiv">
                    <Link to="/crew" className="thanksWord font-weight-bold">
                        <p style={{fontFamily : 'Gill Sans, Gill Sans MT, Calibri,Trebuchet MS, sans-serif'}}>
                            <i className="left arrow"></i>
                            Premium Crew
                        </p>
                    </Link>
                </div>
            </div>
            <img src={images['premiumClubLogo w.png']} alt="premiumClubLogo" className="navBarLogo" id="premiumLogo" />
            <button className="navbar-toggler ml-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0  ml-auto mr-5">
                    <li className="nav-item">
                        <Link className={`nav-link ${home ? 'active': ''}`} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${activities ? 'active': ''}`}    to="/activities">Activities</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className={`nav-link dropdown-toggle ${committees && 'active'}`} to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Our Committees
                        </Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className={`dropdown-item committeeSelector ${marketing && 'activeCommittee'}`} to="/committees/marketing">Marketing Committee</Link></li>
                            <li><hr className="dropdown-divider w-75 mx-auto" /></li>
                            <li><Link className={`dropdown-item committeeSelector ${events && 'activeCommittee'}`} to="/committees/events">Events Committee</Link></li>
                            <li><hr className="dropdown-divider w-75 mx-auto" /></li>
                            <li><Link className={`dropdown-item committeeSelector ${hr && 'activeCommittee'}`} to="/committees/human-resources">HR Committee</Link></li>
                            <li><hr className="dropdown-divider w-75 mx-auto" /></li>
                            <li><Link className={`dropdown-item committeeSelector ${pr && 'activeCommittee'}`} to="/committees/public-relations">PR Committee</Link></li>
                            <li><hr className="dropdown-divider w-75 mx-auto" /></li>
                            <li><Link className={`dropdown-item committeeSelector ${logistics && 'activeCommittee'}`} to="/committees/logistics">Logistics Committee</Link></li>
                            <li><hr className="dropdown-divider w-75 mx-auto" /></li>
                            <li><Link className={`dropdown-item committeeSelector ${media && 'activeCommittee'}`} to="/committees/media">Media Committee</Link></li>
                            <li><hr className="dropdown-divider w-75 mx-auto" /></li>
                            <li><Link className={`dropdown-item committeeSelector ${ac && 'activeCommittee'}`} to="/committees/academic">Academic Committee</Link></li>
                        </ul>
                    </li>
                    {
                        user && (
                            <li className='nav-item dropdown' style={{display: 'flex', flexDirection: 'row'}}>
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{display: 'flex', flexDirection:'row',alignItems:'center'}}>
                                    <img src={PPisLoading ? images['defaultPP.jpg'] : user.user.profilePicUrl} id="profilePic" style={{width:'40px', height:'40px',borderRadius:'50%',objectFit: 'cover',border:'solid gray 2px',marginRight:'6%',backgroundImage:`url('${images['defaultPP.jpg']}')`}}/>
                                    {user.user.name.firstName}
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item profileSelector" to="/profile">Profile</Link></li>
                                    <li><hr className="dropdown-divider w-75 mx-auto" /></li>
                                    <li>
                                        <Link className="dropdown-item profileSelector" to='/dashboard'>
                                            {
                                                user.user.role === 'President' && (
                                                    'President Dashboard'
                                                    )
                                                }
                                            {
                                                user.user.role !== 'President' && (
                                                    'Dashboard'
                                                    )
                                                }
                                        </Link>
                                    </li>
                                    <li><hr className="dropdown-divider w-75 mx-auto" /></li>
                                    <li><Link className="dropdown-item profileSelector " onClick={handleLogout} to="#">Logout</Link></li>
                                </ul>
                            </li>
                        )
                    }
                    {
                        !user && (
                            <li className='nav-item' style={{display:'flex', flexDirection:'row'}}>
                                <Link className={`nav-link ${login && 'active'}`} to="/login">Login</Link>
                            </li>
                        )
                    }
                    <li className="nav-item nav-thanks" >
                        <Link className={`nav-link ${crew && 'active'}`} to="/crew">
                            <p style={{
                                width: "100%",
                                flexWrap: "nowrap"
                            }}>
                                <i className="left arrow"></i>
                                Premium Crew
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </Nav>
    </>
  )
}

export default ClientNavbar;
