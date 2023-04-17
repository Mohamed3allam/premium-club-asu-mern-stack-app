import React, {useEffect} from 'react';
import '../../css/logistics.css';
import ScrollHandle from "../../js/Scroll";
import $ from 'jquery';
import {Helmet} from "react-helmet";
import FirebaseActivation from '../../js/FirebaseActivation';
import ClientNavbar from '../components/ClientNavbar';
import FooterNew from '../components/FooterNew';





const LogisticsCommittee = ({images}) => {



    //FIREBASE
    FirebaseActivation();

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
                    <meta property="og:title" content="Logistics Committee" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.premium-club-asu.org/committees/logistics" />
                    <meta property="og:image" content={images["premiumClubLogoTextMouse.png"]} />
                    
                    <title> Logistics Committee </title>

                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="description" content="Premium Club is a Nonprofit Organization and one of the leading student activities in faculty of Commerce Ain shams University."/>
                    <meta name="keywords" content="premium club,premium, premium club asu, club, asu, بريميم, premium student activity, student activity, كلية تجارة"/>
                        
                </Helmet>
            </div>
            <ClientNavbar images={images} />
            <section className="logistics-description">
                <div className="container">
                    <div className="row py-5  text-light" >
                        <div className="row py-5">
                            <h1 className="h1" style={{fontWeight: 900,fontSize: '50px'}}>
                                Logistics Committee
                            </h1>
                        </div>
                        <div className="row py-5">
                            <h2 className="h2" style={{fontWeight: 900}}>
                                What is Logistics
                            </h2>
                        </div>
                        <div className="row pb-5">

                            <p className="allDescription">
                                &nbsp; Logistics is the whole process of planning and storing materials and products, choosing good materials that fit with the budget set, and that also fit the events and events that will be organized, supervising the events by setting the artistic form for them and decorating them,
                                And always thinking outside the box to attract the targeted groups to join the events organized by attracting their eyes to what we have done.

                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="logisticsRole  bg-white">
                <div className="container">
                    <div className="row pb-5  text-dark" >
                        <div className="row py-5">
                            <h2 className="h2" style={{fontWeight: 900}}>
                                Logistics's role in Premium
                            </h2>
                        </div>
                        <div className="row pb-5">
                            <p className="allDescription">
                                &nbsp; There are multiple roles for logistics in premium like choosing good materials, preparing the club's packages, Supervising the event and choosing the suitable decoration for the event and we participate in any artistic activity of the club and design anything related to the event that the club is creating.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="logistics-description">
                <div className="container">
                    <div className="row pb-5  text-light" >
                        <div className="row py-5">
                            <h1 className="h2" style={{fontWeight: 900}}>
                                Skills obtained
                            </h1>
                        </div>
                        <div className="row pb-5">
                            <ul className="allDescription">
                                <li>
                                    Giving them knowledge of how to choose materials with high quality and at a cheap price and how to conclude agreements with producers by learning the methods of speaking.
                                </li>
                                <li>
                                    Giving members sessions in the fields related to logistics 
                                    Such as drawing, design, photography, decoration and anything related to the artistic image of the club.
                                </li>
                                <li>
                                    Learning how to set up an event by choosing the decoration for the event and choosing things that are able to attract people and entertainment.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="logisticsTeam">
                <div className="container">
                    <div className="align-items-center">
                        <div className="py-5">
                            <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                                Logistics Team
                            </h1>
                        </div>
                        <div className="logisticsPicDiv">
                            <div className="logisticsPic">
                                <img src={images['Logistics.jpeg']} alt="" className="myImg img-fluid"/>
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
 
export default LogisticsCommittee;