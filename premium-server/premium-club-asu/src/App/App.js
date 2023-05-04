import './css/navbar.css';
import './css/footer.css';
import './css/scrollbar.css';
import './css/bootstrap.css';
import './css/allDescription.css';
import './css/headers.css';

import 'bootstrap/dist/js/bootstrap.min.js'
import styled from 'styled-components'

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Loader from './pages/components/Loader';

import Home from './pages/Home';
import Login from './pages/Login'
import Activities from './pages/Activites'
import Crew from './pages/Crew';

import MarketingCommittee from './pages/Committees/Marketing';
import EventsCommittee from './pages/Committees/Events';
import LogisticsCommittee from './pages/Committees/Logistics';
import HumanResourcesCommittee from './pages/Committees/Hr';
import PublicRelationsCommittee from './pages/Committees/Pr';
import MediaCommittee from './pages/Committees/Media';
import AcademicCommittee from './pages/Committees/Academic';

import NotFound from './pages/NotFound'; 

import { useAuthContext } from './hooks/useAuthContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { HomeContextProvider } from './context/HomePageContext';
import config from '../config';
import ClientNavbar from './pages/components/ClientNavbar';
const Committee = lazy(() => import("./pages/Committees/Committee"));


const Container = styled.div`
  display: flex;
`
const Background = styled.div`
  background-image: url();
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
  position: relative;
`

function App({ images }) {
  const { user } = useAuthContext()

  const premiumApi = config.premiumApi
  const [ activities, setActivities ] = useState('')
  const [ committees, setCommittees ] = useState('')
  const [ homeSections, setHomeSections ] = useState('')
  const [ homeImgs, setHomeImgs ] = useState('')
  const [ isLoading, setIsLoading ] = useState(true)
  
      useEffect(() => {
        
        //-------------------------------------------------------------------------------
        const fetchActivities = async () => {
            const response = await fetch(`${premiumApi}/activity-api/activities`, {
                method:'GET'
            })
            const json = await response.json()
            if (response.ok) {
                setActivities(json)
                setIsLoading(false)
            }
        }
        const fetchCommittees = async () => {
          const response = await fetch(`http://localhost:5000/committee-api/committees`, {
            method:'GET'
          })
          const json = await response.json()
          if (response.ok) {
            setCommittees(json)
          }
        }
        const fetchSections = async () => {
          const response = await fetch(`${premiumApi}/home-api/sections`)
          const json = await response.json()
          if (response.ok) {
              setHomeSections(json)
          }
        }
        const fetchMainEvents = async () => {
            const response = await fetch(`${premiumApi}/home-api/home-main-events-images/json`, {
                method: 'GET'
            })
            const json = await response.json()
            if (response.ok) {
                setHomeImgs(json)
            }
        }
        fetchCommittees()
        fetchSections()
        fetchMainEvents()
        fetchActivities()
        //-------------------------------------------------------------------------------

        const checkLoaded = setInterval(()=>{
          console.log(document.readyState)
          if (document.readyState === 'complete') {
            setIsLoading(false)
            clearInterval(checkLoaded);
          } else {
            setIsLoading(true)
          }
        },100)
      }, [user]);
      //-----------


  return (
    <>
      <HelmetProvider>
        <HomeContextProvider>
          <Helmet>
            <meta httpEquiv="Access-Control-Allow-Origin" content="http://127.0.0.1:3000/dashboard/website-edit" />
          </Helmet>
          <Background id='bg'>
            <video style={{position:'fixed',width:'100%',height:'100%',objectFit:'cover',top:0,left:0,zIndex:0}} onPauseCapture={(e) => e.preventDefault()} disableRemotePlayback={false} controls={false} autoPlay={true} muted={true} loop={true} playsInline={true}>
              <source src={images['space1.mp4']} type='video/mp4'/>
            </video>

            <Suspense fallback={<Loader images={images}/>}>
              <div id='site' style={
                isLoading ? {
                  display:'none'
                } : {
                  animation:'fadeIn 1s linear'
                }
              }>
                <ClientNavbar images={images} committees={committees && committees} />
                <Routes>
                    <Route index element={<Home homeSections={homeSections && homeSections} homeImgs={homeImgs && homeImgs} images ={images}/>} />
                    <Route path="activities" element={<Activities activities={ activities } images ={images}/>} />
                    <Route path="crew" element={<Crew committees={committees} images ={images}/>} />

                    {
                      committees && committees.map((committee) => (
                        <Route key={committee._id} path={`committees/${committee.committee_name.replace(/\s+/g, '-').toLowerCase()}`} element={<Committee committee={committee} images ={images}/>} />
                      ))
                    }

                    <Route path="/login"  element={user ? <Navigate to='/'/> : <Login images ={images}/>} />

                    <Route path="*" element={<NotFound images={images}/>} />
                </Routes>
              </div>
            </Suspense>
          </Background>
        </HomeContextProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
