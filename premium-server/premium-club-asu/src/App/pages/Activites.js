import React, { useEffect, useState } from 'react';
import '../css/activities.css';
import ScrollHandle from "../js/Scroll";
import SimpleSlider from "./ActivitiesSliders/SimpleSlider";

import {Helmet} from "react-helmet";
import FirebaseActivation from '../js/FirebaseActivation';
import ClientNavbar from "./components/ClientNavbar";
import FooterNew from './components/FooterNew';
import config from '../../config';

  




const Activities = ({activities, images}) => {

    //FIREBASE
    FirebaseActivation();
    //-------------------


    
    //SCROLLING NAVBAR
    ScrollHandle();
    //-----------
    
    const [ loading, setLoading ] = useState(true)
    const premiumApi = config.premiumApi
    

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
            <div className='activities-container'>
                {
                    activities && activities.map((activity) => (
                        <section className="activity" key={activity._id}>
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="py-5  headers">
                                        <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                                            {activity.activityTitle}
                                        </h1>
                                    </div>
                                    <div className='activity-container' style={{display:'flex',flexDirection: activity.flexDirection}}>
                                        <SimpleSlider images={images} activity={activity} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))
                }
                {
                    loading && (
                        <h1 className='bg-white m-0 text-center p-5'>
                            Loading Activities...
                        </h1>
                    )
                }
                <section className="footerQuote">
                    <p className="text-center text-dark font-weight-bold bg-white quote pb-3">
                        And it's not all we got.. it's just a beginning.
                    </p>
                </section>
            </div>
            <FooterNew images={images} />
            <script type="text/javascript" src="../js/slick.min.js"></script>
        </>
     )
};
 
export default Activities;