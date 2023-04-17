import '../css/homePage.css'
import styled from 'styled-components';

import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import FirebaseActivation from '../js/FirebaseActivation';
import Carousel from 'react-bootstrap/Carousel';

import { useAuthContext } from '../hooks/useAuthContext';
import { useHomeContext } from '../hooks/useHomeContext';

import ScrollHandle from '../js/Scroll';
import ClientNavbar from './components/ClientNavbar';
import FooterNew from './components/FooterNew';


const HomeSection = styled.section`
`
const Home = ({images}) => {

    const {sections,dispatch} = useHomeContext();
    const { user } = useAuthContext()


    
    //FIREBASE
    FirebaseActivation();
    //-------------------

    ScrollHandle();
    
    useEffect(()=> {
        const fetchSections = async () => {
            const response = await fetch('/home-api/sections')
            const json = await response.json()
            if (response.ok) {
                dispatch({type: 'SET_SECTIONS', payload:json})
            }
        }
        fetchSections()
    }, [])
    
    return ( 
        <>
        <HelmetProvider>
            <div className="wrapper">
                <Helmet>
                    <meta property="og:title" content="Premium Club ASU" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.premium-club-asu.org" />
                    <meta property="og:image" content={images["premiumClubLogoTextMouse.png"]} />
                    
                    <title> Premium Club ASU </title>

                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="description" content="Premium Club is a Nonprofit Organization and one of the leading student activities in faculty of Commerce Ain shams University."/>
                    <meta name="keywords" content="premium club,premium, premium club asu, club, asu, بريميم, premium student activity, student activity, كلية تجارة"/>
                </Helmet>
            </div>
            <div>
                <ClientNavbar images={images} />
                <section  className="identifier" id="identifier" >
                    <div className="container">
                        <div className="row">
                            <div className="col"></div>
                            <div className="col-sm-6">
                                <div className="noGuts" id="noGuts">
                                    <div>
                                        <img src={ images['premiumClubLogo w.png'] } alt="Premium Club" className="mainLogo" style={{pointerEvents:'none'}}/>
                                    </div>
                                    <h1 className="premiumClubWord" id="premiumClubWord">
                                        PREMIUM CLUB<br />
                                    </h1>
                                </div>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                </section>
                
                    
                {
                    sections && sections.map((section)=>{return(
                        <HomeSection key={section._id} className="whoArePremium" id="whatIsPremium" style={{backgroundColor: `${section.backgroundColor}`, color: section.fontColor}}>
                            <div className="container"> 
                                <div className="row py-5" >
                                    <div className="row py-5">
                                        <h1 className="h1" style={{fontWeight: '900'}}>
                                            {section.title}
                                        </h1>
                                    </div>
                                    <div className="row pb-5">
                                        <p className="allDescription">
                                            {section.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </HomeSection>
                    )})
                }

                {
                    !sections && (
                        <>
                            <section className="whoArePremium" id="whatIsPremium" style={{backgroundColor:'white'}}>
                                    <div className="container">
                                        <div className="row py-5" >
                                            <div className="row py-5">
                                                <h1 className="h1 text-dark" style={{fontWeight: '900'}}>
                                                    What is Premium
                                                </h1>
                                            </div>
                                            <div className="row pb-5">
                                                <p className="allDescription">
                                                    Premium Club is a Nonprofit Organization and one of the leading student activities in faculty of Commerce Ain shams University, premium Club was established in 2018/2019... With leading of Dr. Wael Saad, we are interested in how to change the boring routine of the college studying in a new dynamic way, with a challenging atmosphere, full of practical work Which enables the club members to gather experiences and enhance their personal skills, possess a whole new spirit full of enthusiasm, and give inspiration to his/her mind to work which increases creativity and mental abilities.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            <section className="mission">
                                <div className="container text-light">
                                    <div className="row py-5" >
                                        <div className="row py-5">
                                            <h1 className="h1 " style={{fontWeight: '900'}}>
                                                Our Mission
                                            </h1>
                                        </div>
                                        <div className="row pb-5">
                                            <p className="allDescription">
                                                Helping our members develop their mindsets  ,  gain experience and prepare them for the life after graduation in the difference field’s by our academic sessions , workshops and free courses and applying what they have learned in real life.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            

                            <section className="vision">
                                <div className="container">
                                    <div className="row py-5" >
                                        <div className="row py-5">
                                            <h1 className="h1 text-dark" style={{fontWeight: 900}}>
                                                Our Vision
                                            </h1>
                                        </div>
                                        <div className="row pb-5">
                                            <p className="allDescription">
                                                Being one of the best clubs in the faculty if commerce and let everyone in the whole universities know who is premium club!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            


                            <section className="goals">
                                <div className="container text-light">
                                    <div className="row py-5" >
                                        <div className="row py-5">
                                            <h1 className="h1" style={{fontWeight: 900}}>
                                                Our Goals
                                            </h1>
                                        </div>
                                        <div className="row pb-5">
                                            <p className="allDescription">
                                                Increase Student Leadership Opportunities, Provide new ways for a student to be developed and experienced in leadership capacities.
                                                <br /> And create new ideas for campus programming, organizational development, and problem-solving.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>
                    )
                }    


                    <section className="mainEvents">
                        <div className="container">
                            <div className="row py-5" >
                                <div className="row py-5">
                                    <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                                        Main Events
                                    </h1>
                                </div>
                                <div className="row pb-5">
                                    {/* <HomeCarousel /> */}
                                    <Carousel fade id='carouselExampleCrossfade' >
                                        <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            src={images['conferencePhoto.jpg']}
                                            alt="First slide"
                                            />
                                            <Carousel.Caption>
                                                <h3>CONFERENCE DAY</h3>
                                                <p>2021-2022</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            src={images['opening2021.jpg']}
                                            alt="Second slide"
                                            />

                                            <Carousel.Caption>
                                                <h3>OPENING DAY</h3>
                                                <p>2021-2022</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            src={images['orientation2021.jpg']}
                                            alt="Third slide"
                                            />

                                            <Carousel.Caption>
                                                <h3>ORIENTATION DAY</h3>
                                                <p>2021-2022</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                            className="d-block w-100"
                                            src={images['alex2021.jpg']}
                                            alt="Third slide"
                                            />

                                            <Carousel.Caption>
                                                <h3>ALEXANDRIA TRIP</h3>
                                                <p>2021-2022</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </section>
                
                
                    <section className="noGutsFooter">
                        <div className="container">
                            <div className="row">
                                <div className="col"></div>
                                <div className="col-sm-6">
                                    <div className="noGutsFooter" id="noGuts">
                                        <div>
                                            <p className="lead text-center text-light font-weight-bold" style={{userSelect:'none'}}>And always remember</p>
                                        </div>
                                        <h1 className="noGutsWord" id="noGutsWord">
                                            NO GUTS NO GLORY
                                        </h1>
                                    </div>
                                </div>
                                <div className="col"></div>
                            </div>
                        </div>
                    </section>
            </div>
            <FooterNew images={images} />
        </HelmetProvider>
        </>
     );
}
 
export default Home;