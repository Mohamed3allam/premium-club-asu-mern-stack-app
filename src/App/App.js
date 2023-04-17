import './css/navbar.css';
import './css/footer.css';
import './css/scrollbar.css';
import './css/bootstrap.css';
import './css/allDescription.css';
import './css/headers.css';

import 'bootstrap/dist/js/bootstrap.min.js'
import styled from 'styled-components'

import React, { Suspense, useEffect, useState } from 'react';
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

  const [isLoading, setIsLoading] = useState(true)
  
       //INTRO
      useEffect(() => {
        const checkLoaded = setInterval(()=>{
          console.log(document.readyState)
          if (document.readyState === 'complete') {
            setIsLoading(false)
            clearInterval(checkLoaded);
          } else {
            setIsLoading(true)
          }
        },100)
      }, []);
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
                <Routes>
                    <Route index element={<Home images ={images}/>} />
                    <Route path="activities" element={<Activities images ={images}/>} />
                    <Route path="crew" element={<Crew images ={images}/>} />

                    <Route path="committees/marketing" element={<MarketingCommittee images ={images}/>} />
                    <Route path="committees/events" element={<EventsCommittee images ={images}/>} />
                    <Route path="committees/logistics" element={<LogisticsCommittee images ={images}/>} />
                    <Route path="committees/human-resources" element={<HumanResourcesCommittee images ={images}/>} />
                    <Route path="committees/public-relations" element={<PublicRelationsCommittee images ={images}/>} />
                    <Route path="committees/media" element={<MediaCommittee images ={images}/>} />
                    <Route path="committees/academic" element={<AcademicCommittee images ={images}/>} />

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
