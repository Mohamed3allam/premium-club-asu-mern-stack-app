import styled from "styled-components";
import './css/helloPresident.css';

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import DashboardLoader from "./components/loader/DashboardLoader";

import Home from "./pages/Home";
import UserList from "./pages/userList/UserList";
import UserPage from "./pages/user/UserPage";
import NewUser from "./pages/new user/NewUser";
import Website from "./pages/website/Website";

import { useAuthContext } from "./hooks/useAuthContext";

import { Route,Routes, Navigate, Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { Helmet ,HelmetProvider } from "react-helmet-async";
import config from "../config";
import { useActivityContext } from "./hooks/useActivityContext";
import Profile from "./pages/profile/Profile";
import { mobile } from "./responsive";

const Container = styled.div`
  display: flex;
  padding-top: 120px;
  padding-left: 280px;
  ${mobile({
    paddingTop:'50px',
    paddingLeft:'100px'
  })}
`
const Background = styled.div`
  background-image: url('/shownimage/backgroundimage');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-color: #464646;
  overflow-x:hidden;
  height: 100vh;
  padding:0;
  transition: none !important;
`


const  DashboardApp = () => {

  function importAll(r) {
    let images = {};
      r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
  }
  const images = importAll(require.context('./imgs', false, /\.(png|jpe?g|svg|gif)$/));


  const { user } = useAuthContext()

  const premiumApi = config.premiumApi

  const [ isLoading, setIsLoading ] = useState(true)
  const [ showHelloPresident, setShowHelloPresident ] = useState(false)

  const [ users, setUsers ] = useState('')
  const [ highboard, setHighboard ] = useState('')
  const [ board, setBoard ] = useState('')
  const [ members, setMembers ] = useState('')
  const [ academic, setAcademic ] = useState('')
  const [ media, setMedia ] = useState('')
  const [ marketing, setMarketing ] = useState('')
  const [ hr, setHr ] = useState('')
  const [ pr, setPr ] = useState('')
  const [ logistics, setLogistics ] = useState('')
  const [ events, setEvents ] = useState('')

  const [ activities, setActivities ] = useState('')
  const [ sections, setSections ] = useState('')
  const [ committees, setCommittees ] = useState('')


  useEffect(() => {

    const checkLoaded = setInterval(()=>{
      console.log(document.readyState)
      if (document.readyState === 'complete') {
        setIsLoading(false)
        if (user.user.role === 'President') {
          setShowHelloPresident(true)
          setTimeout(()=>{
            setShowHelloPresident(false)
          }, 3000)
        }
        clearInterval(checkLoaded);
      } else {
        setIsLoading(true)
      }
    },100)
    console.log('Hello from Dashboard')

    // all fetches -------------------------------------------------
    const fetchAllUsers = async () => {
      const response = await fetch(`${premiumApi}/users/allusers`, {
        method:'GET',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setUsers(json)
      }
    }
    const fetchHighboard = async () => {
      const response = await fetch(`${premiumApi}/users/highboard`, {
        method:'GET',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setHighboard(json)
      }
    }
    const fetchBoard = async () => {
      const response = await fetch(`${premiumApi}/users/board`, {
        method:'GET',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setBoard(json)
      }
    }
    const fetchMembers = async () => {
      const response = await fetch(`${premiumApi}/users/members`, {
        method:'GET',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setMembers(json)
      }
    }
    const fetchAcademic = async () => {
      const response = await fetch(`${premiumApi}/users/Academic`, {
        method:'GET',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setAcademic(json)
      }
    }
    const fetchEvents = async () => {
      const response = await fetch(`${premiumApi}/users/Events`, {
        method:'GET',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setEvents(json)
      }
    }
    const fetchHR = async () => {
      const response = await fetch(`${premiumApi}/users/human-resources`, {
        method:'GET',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setHr(json)
      }
    }
    const fetchLogistics = async () => {
      const response = await fetch(`${premiumApi}/users/Logistics`, {
        method:'GET',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setLogistics(json)
      }
    }
    const fetchMarketing = async () => {
      const response = await fetch(`${premiumApi}/users/marketing`, {
        method:'GET',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setMarketing(json)
      }
    }
    const fetchMedia = async () => {
      const response = await fetch(`${premiumApi}/users/media`, {
        method:'GET',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setMedia(json)
      }
    }
    const fetchPR = async () => {
      const response = await fetch(`${premiumApi}/users/public-relations`, {
        method:'GET',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setPr(json)
      }
    }
    fetchAllUsers();
    fetchHighboard();
    fetchBoard();
    fetchMembers();
    
    fetchMedia();
    fetchMarketing();
    fetchEvents();
    fetchHR();
    fetchPR();
    fetchLogistics();
    fetchAcademic();

    const fetchActivities = async () => {
      const response = await fetch(`${premiumApi}/activity-api/activities`, {
        method:'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setActivities(json)
      }
    }
    const fetchSections = async () => {
      const response = await fetch(`${premiumApi}/home-api/sections`, {
          headers: {
              "Authorization": `Bearer ${user.token}`
          }
      })
      const json = await response.json()
      if (response.ok) {
          setSections(json)
      }
    }
    const fetchCommittees = async () => {
      const response = await fetch(`${premiumApi}/committee-api/committees`, {
        method:'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        setCommittees(json)
      }
    }
    fetchCommittees()
    fetchSections()
    fetchActivities()
    //-----------------------------------------------------
  }, []);
  const committeeMembers = {
    media,
    marketing,
    events,
    hr,
    pr,
    logistics,
    academic
  }
  const websiteData = {
    activities,
    sections,
    committees
  }
  return (
    <>
    <HelmetProvider>
      <Helmet>
          <meta property="og:title" content="Premium Dashboard" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.premium-club-asu.org/dashboard" />
          <meta property="og:image" content={images["premiumClubLogoTextMouse.png"]} />
          
          <title> Dashboard </title>

          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
      {
        isLoading && (
          <DashboardLoader images={images} style={{backgroundColor:'white',backgroundImage:'none'}} />
        )
      }
      <div id="helloPresident" style={
        showHelloPresident 
        ?  {
          animation: 'fadeIn 2s linear',
        } : {
          animation: 'fadeOut 1s linear',
          display:'none'
        }
      }>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
          <h1><b>hello, president.</b></h1>
        </div>
      </div>
      <div id='site' style={
        isLoading || showHelloPresident ? {
          display:'none'
        } : {
          animation:'fadeIn 1s linear'
        }
      }>
          <Topbar images={images}/>
            <Sidebar committees={committees && committees}/>
          <Container>
            <Routes>
              <Route index element={<Home users={users}/>} />
              <Route path="profile" element={<Profile users={users}/>} />
              <Route path="website-edit/*" element={<Website websiteData={websiteData} images={images} />} >
                <Route path="*" element={<Website websiteData={websiteData} images={images}/>} />
              </Route>

              <Route path="users/" element={<UserList 
                users={users && users} 
                highboard={highboard} 
                board={board} 
                members={members} 
                committeeMembers={committeeMembers}
                images={images}
              />}>
                <Route path="*" element={<UserList 
                  users={users && users} 
                  highboard={highboard} 
                  board={board} 
                  members={members}
                  committeeMembers={committeeMembers}
                  images={images}
                />} />
              </Route>
              
              <Route path="user/:userId" element={<UserPage/>}>
                  <Route path="*" element={<UserPage/>} />
              </Route>
              <Route path="newUser/" element={<NewUser/>} />
            </Routes>
          </Container>
      </div>
    </HelmetProvider>
    </>
  );
}

export default DashboardApp;
