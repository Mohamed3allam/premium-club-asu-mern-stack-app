import React, {useEffect, useState} from 'react';
import '../../css/committee.css';
import ScrollHandle from "../../js/Scroll";
import $ from 'jquery';
import {Helmet} from "react-helmet";
import FirebaseActivation from '../../js/FirebaseActivation';
import FooterNew from "../components/FooterNew";
import ClientNavbar from "../components/ClientNavbar";
import { fetchAndSetAll } from '../../client-fetch-helpers';
import config from '../../../config';
import { useAuthContext } from '../../hooks/useAuthContext';
import CommitteeSection from './CommitteeSection';





const Committee = ({ committee, images }) => {
    const { user } = useAuthContext()

    const premiumApi = config.premiumApi
    //FIREBASE
    FirebaseActivation();
    //------------------------

    //SCROLLING NAVBAR
    ScrollHandle();
    //-----------


    useEffect(() => {
        const modal = document.getElementById("myModal");
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        const modalImg = document.getElementById("img01");
        const captionText = document.getElementById("caption");
        $(document).ready(function(){
    
                $(document).on("click", ".myImg", function()
                {
                    modalImg.src =  this.src;
                    modal.style.display = "block";
                    captionText.innerHTML = this.alt;
                    console.log($(this).attr("src"));
                    //for changing it
                });
            
        });
        // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        } 
    }, []);


    return ( 
        <>
            <div className="wrapper">
                <Helmet>
                    <meta property="og:title" content="Media Committee" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`https://www.premium-club-asu.org/committees/${committee.committee_name.replace(/\s+/g, '-').toLowerCase()}`} />
                    <meta property="og:image" content={images["premiumClubLogoTextMouse.png"]} />
                    
                    <title> {committee.committee_name} Committee </title>

                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="description" content="Premium Club is a Nonprofit Organization and one of the leading student activities in faculty of Commerce Ain shams University."/>
                    <meta name="keywords" content="premium club,premium, premium club asu, club, asu, بريميم, premium student activity, student activity, كلية تجارة"/>
                        
                </Helmet>
            </div>
            <section className="committee-description">
                <div className="container">
                    <div className="row py-5  text-light" >
                        <div className="row py-5">
                            <h1 className="h1" style={{fontWeight: 900,fontSize: "50px"}}>
                                {committee.committee_name} Committee
                            </h1>
                        </div>
                        <div className="row pb-5">
                            <p className=" allDescription">
                                {committee.committee_description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {
                committee && (
                    <div>
                        {
                            committee.committee_sections.map((committeeSection) => (
                                <CommitteeSection key={committeeSection._id} committeeSection={committeeSection} />
                            ))
                        }
                    </div>
                )
            }

            <section className="committeeTeam">
                <div className="container">
                    <div className="align-items-center">
                        <div className="py-5">
                            <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                                {committee.committee_name} Team 
                            </h1>
                        </div>
                        <div className="committeePicDiv">
                            <div className="committeePic">
                                <img src={`${premiumApi}${committee.committee_image_url}`} alt="" className="myImg img-fluid"/>
                            </div>
                            <div id="myModal" className="modal">

                                <span className="close">&times;</span>
                            
                                <img className="modal-content" id="img01"/>
                            
                                <div id="caption"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterNew images={images}/>
        </>
     );
}
 
export default Committee;