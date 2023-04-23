import React from 'react';
import '../css/activities.css';
import ScrollHandle from "../js/Scroll";
import SimpleSliderOpening from "./ActivitiesSliders/SimpleSliderOpening";
import SimpleSliderOrientation from "./ActivitiesSliders/SimpleSliderOrientation";
import SimpleSliderSessions from "./ActivitiesSliders/SimpleSliderSessions";
import SimpleSliderFinalConference from "./ActivitiesSliders/SimpleSliderFinalConference";
import SimpleSliderTrips from "./ActivitiesSliders/SimpleSliderTrips";
import SimpleSliderAwards from "./ActivitiesSliders/SimpleSliderAwards";

import {Helmet} from "react-helmet";
import FirebaseActivation from '../js/FirebaseActivation';
import ClientNavbar from "./components/ClientNavbar";
import FooterNew from './components/FooterNew';

  




const Activities = ({images}) => {

    //FIREBASE
    FirebaseActivation();
    //-------------------



    //SCROLLING NAVBAR
    ScrollHandle();
    //-----------


    return ( 
        <>

            <div className="wrapper">
                <Helmet>
                    <meta property="og:title" content="Premium Activities" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.premium-club-asu.org/activities" />
                    <meta property="og:image" content={images["premiumClubLogoTextMouse.png"]} />
                    
                    <title> Premium Activities </title>

                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="description" content="Premium Club is a Nonprofit Organization and one of the leading student activities in faculty of Commerce Ain shams University."/>
                    <meta name="keywords" content="premium club,premium, premium club asu, club, asu, بريميم, premium student activity, student activity, كلية تجارة"/>
                </Helmet>
            </div>
            <ClientNavbar images={images}/>
            <section className="activities-description">
                <div className="container">
                    <div className="row py-5  text-light">
                        <div className="row py-5 ">
                            <h1 className=" header" style={{fontWeight: 900}}>
                                Activities
                            </h1>
                        </div>
                        <div className="row pb-5">
                            <p className="lead  font-weight-bold">
                                As a student activity we have got some activities that we do for either increasing social interacts with each other ,  motivating our members , or even increasing enthusiasm for more work with the club to give it's member the best experience they can take and to raise premium club's name to the top.
                            </p>
                            <br />
                            <p className="lead  font-weight-bold">
                                Our activities are not just limited to trips and having fun , there are also serious times that we need to give our best and have the most benefit and experience. those are in our sessions , teamwork , organizing events etc.
                            </p>
                            <br />
                        </div>
                    </div>
                    <p className="lead text-center text-light font-weight-bold">
                        Here are some of our activities that brought us together.
                    </p>
                </div>
            </section>
            <section className="opening">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="py-5  headers">
                            <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                                Opening Day (2021-2022)
                            </h1>
                        </div>
                        <div className="sliderDivLTR">
                            <SimpleSliderOpening images = {images}/>
                        </div>
                    </div>
                </div>
            </section><section className="orientation">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="py-5  headers">
                            <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                                Orientation Day (2021-2022)
                            </h1>
                        </div>
                        <div className="sliderDivRTL">
                            <SimpleSliderOrientation images= {images}/>
                        </div>
                    </div>
                </div>
            </section><section className="sessions">
                <div className="container">
                    <div className="py-5  headers">
                        <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                            Sessions
                        </h1>
                    </div>
                    <div className="row align-items-center">
                        <div className="sliderDivLTR">
                            <SimpleSliderSessions images = {images}/>
                        </div>
                    </div>
                </div>
            </section><section className="conference">
                <div className="container">
                    <div className="py-5  headers">
                        <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                            Final Conference
                        </h1>
                    </div>
                    <div className="row align-items-center">
                        <div className="sliderDivLTR">
                            <SimpleSliderFinalConference images = {images}/>
                        </div>
                    </div>
                </div>
            </section><section className="trips">
                <div className="container">
                    <div className="py-5  headers">
                        <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                            Trips
                        </h1>
                    </div>
                    <div className="row align-items-center">
                        <div className="sliderDivRTL">
                            <SimpleSliderTrips images={images} />
                        </div>
                    </div>
                </div>
            </section><section className="awards">
                <div className="container">
                    <div className="py-5  headers">
                        <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                            Awards
                        </h1>
                    </div>
                    <div className="row align-items-center">
                        <div className="sliderDivLTR">
                            <SimpleSliderAwards images = {images}/>  
                        </div>
                    </div>
                </div>
            </section><section className="footerQuote">
                <p className="text-center text-dark font-weight-bold bg-white quote pb-3">
                    And it's not all we got.. it's just a beginning.
                </p>
            </section>
            <FooterNew images={images} />
            <script type="text/javascript" src="../js/slick.min.js"></script>
        </>
     )
};
 
export default Activities;