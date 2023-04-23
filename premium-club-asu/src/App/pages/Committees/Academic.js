import React, {useEffect} from 'react';
import '../../css/media.css';
import ScrollHandle from "../../js/Scroll";
import $ from 'jquery';
import {Helmet} from "react-helmet";
import FirebaseActivation from '../../js/FirebaseActivation';
import FooterNew from "../components/FooterNew";
import ClientNavbar from "../components/ClientNavbar";





const AcademicCommittee = ({images}) => {



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
                    <meta property="og:url" content="https://www.premium-club-asu.org/committees/media" />
                    <meta property="og:image" content={images["premiumClubLogoTextMouse.png"]} />
                    
                    <title> Academic Committee </title>

                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="description" content="Premium Club is a Nonprofit Organization and one of the leading student activities in faculty of Commerce Ain shams University."/>
                    <meta name="keywords" content="premium club,premium, premium club asu, club, asu, بريميم, premium student activity, student activity, كلية تجارة"/>
                        
                </Helmet>
            </div>
            <ClientNavbar images={images} />
            <section className="media-description">
                <div className="container">
                    <div className="row py-5  text-light" >
                        <div className="row py-5">
                            <h1 className="h1" style={{fontWeight: 900,fontSize: "50px"}}>
                                Academic Committee
                            </h1>
                        </div>
                        <div className="row pb-5">
                            <p className=" allDescription">
                                &nbsp; Academic team is responsible for giving training sessions and organizing events such as guest lectures, workshops, and other educational activities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mediaRole  bg-white">
                <div className="container">
                    <div className="row pb-5  text-dark" >
                        <div className="row py-5">
                            <h2 className="h2" style={{fontWeight: 900}}>
                                Academic Team role in Premium
                            </h2>
                        </div>
                        <div className="row pb-5">
                            <p className="allDescription">
                            The academic committee is responsible for training sessions. It helps students to give presentations, lead a team, and work in teamwork. This includes support to help them achieve their academic goals and ensure that the student’s activities are in line with their's educational mission. 
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="media-description">
                <div className="container">
                    <div className="row pb-5  text-light" >
                        <div className="row py-5">
                            <h1 className="h2" style={{fontWeight: 900}}>
                                Skills obtained
                            </h1>
                        </div>
                        <div className="row pb-5">
                            <ul className="allDescription">
                                Being able to think creatively about which design is needed for our posts on any platform for an event or an occasion.
                                <br/>Learning to use some needed programs through the year like photoshop and else .. Or raising your skill using the program you're sutiable with.
                                <br/>Joining us in making videos about our events through the year which raises your video editing skills.
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mediaTeam">
                <div className="container">
                    <div className="align-items-center">
                        <div className="py-5">
                            <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                                Media Team 
                            </h1>
                        </div>
                        <div className="mediaPicDiv">
                            <div className="mediaPic">
                                <img src={images["AC.jpeg"]} alt="" className="myImg img-fluid"/>
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
 
export default AcademicCommittee;