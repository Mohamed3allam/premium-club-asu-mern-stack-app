import React, {useEffect} from 'react';
import '../../css/events.css';
import ScrollHandle from "../../js/Scroll";
import $ from 'jquery';
import {Helmet} from "react-helmet";
import FirebaseActivation from '../../js/FirebaseActivation';
import ClientNavbar from "../components/ClientNavbar";
import FooterNew from "../components/FooterNew";






const EventsCommittee = ({images}) => {

    //FIREBASE
    FirebaseActivation();
    //-------------------

    //SCROLLING NAVBAR
    ScrollHandle();
    //-----------


    useEffect(() => {
        const modal = document.getElementById("myModal");
    
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        const modalImg = document.getElementById("img01");
        const captionText = document.getElementById("caption");
    
    
    
        $(document).ready(function(){
                $(document).on("click", ".myImg", function() {
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
                    <meta property="og:title" content="Events Committee" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.premium-club-asu.org/committees/events" />
                    <meta property="og:image" content={images["premiumClubLogoTextMouse.png"]} />
                    
                    <title> Events Committee </title>

                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="description" content="Premium Club is a Nonprofit Organization and one of the leading student activities in faculty of Commerce Ain shams University."/>
                    <meta name="keywords" content="premium club,premium, premium club asu, club, asu, بريميم, premium student activity, student activity, كلية تجارة"/>
                        
                </Helmet>
            </div>
            <ClientNavbar images={images} />
            <section className="events-description">
                <div className="container">
                    <div className="row py-5  text-light" >
                        <div className="row py-5">
                            <h1 className="h1" style={{fontWeight: 900,fontSize: "50px"}}>
                                Events Committee
                            </h1>
                        </div>
                        <div className="row py-5">
                            <h2 className="h2" style={{fontWeight: 900}}>
                                What is Event Organizing
                            </h2>
                        </div>
                        <div className="row pb-5">
                            <p className=" allDescription">
                                Event organizing is the application of project management to the creation and development of small and/or large-scale personal or corporate events such as festivals, conferences, ceremonies, formal parties, or conventions. It involves studying the brand, identifying its target audience, devising the event concept, and coordinating the technical aspects before actually launching the event.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="eventsRole  bg-white">
                <div className="container">
                    <div className="row pb-5  text-dark" >
                        <div className="row py-5">
                            <h2 className="h2" style={{fontWeight: 900}}>
                                Event Organizing's role in Premium
                            </h2>
                        </div>
                        <div className="row pb-5">
                            <p className="allDescription">
                                Plan and coordinate different events such as opening, orientation, trips and so on.
                                Being responsible for whatever happens during any event held by the club.
                                The image of the club depends on our work.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="events-description">
                <div className="container">
                    <div className="row pb-5  text-light" >
                        <div className="row py-5">
                            <h1 className="h2" style={{fontWeight: 900}}>
                                Skills obtained
                            </h1>
                        </div>
                        <div className="row pb-5">
                            <ul className="allDescription">
                                <span style={{fontWeight: "bold"}}>Responsibility</span><br/>
                                By joining our committee you will become in charge of a full event and a high number of people so you will gain experience and become more responsible.
                                <br/><br/> <span style={{fontWeight: "bold"}}>Problem solving</span><br/>
                                If you joined us you will experience different situations and therefore you will learn how to deal with any situation no matter how hard it is.
                                <br/><br/> <span style={{fontWeight: "bold"}}>Flexibility</span> <br/>
                                Organizing events will make you more flexible and you will gain the ability to deal with anything and anyone and will improve your self confidence.

                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="eventsTeam">
                <div className="container">
                    <div className="align-items-center">
                        <div className="py-5">
                            <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                                Events Team
                            </h1>
                        </div>
                        <div className="eventsPicDiv">
                            <div className="eventsPic">
                                <img src={images["Events.jpeg"]} alt="" className="myImg img-fluid"/>
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
 
export default EventsCommittee;