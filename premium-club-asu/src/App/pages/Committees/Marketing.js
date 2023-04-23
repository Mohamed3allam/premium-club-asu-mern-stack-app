import React, {useEffect} from 'react';
import '../../css/marketing.css';
import ScrollHandle from "../../js/Scroll";
import $ from 'jquery';
import {Helmet} from "react-helmet";
import FirebaseActivation from '../../js/FirebaseActivation';
import FooterNew from "../components/FooterNew";
import ClientNavbar from "../components/ClientNavbar";





const MarketingCommittee = ({images}) => {



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
                    <meta property="og:title" content="Marketing Committee" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.premium-club-asu.org/committees/marketing" />
                    <meta property="og:image" content={images["premiumClubLogoTextMouse.png"]} />
                    
                    <title> Marketing Committee </title>

                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="description" content="Premium Club is a Nonprofit Organization and one of the leading student activities in faculty of Commerce Ain shams University."/>
                    <meta name="keywords" content="premium club,premium, premium club asu, club, asu, بريميم, premium student activity, student activity, كلية تجارة"/>
                        
                </Helmet>
            </div>
            <ClientNavbar images={images} />
            <section className="marketing-description">
                <div className="container">
                    <div className="row py-5  text-light" >
                        <div className="row py-5">
                            <h1 className="h1" style={{fontWeight: 900,fontSize: "50px"}}>
                                Marketing Committee
                            </h1>
                        </div>
                        <div className="row py-5">
                            <h2 className="h2" style={{fontWeight: 900}}>
                                What is Marketing
                            </h2>
                        </div>
                        <div className="row pb-5">

                            <p className="allDescription">
                                &nbsp; Any profitable or non-profit Orginzation care for their marketing plan, as it's one of the main growth reasons. <br/><br/>
                                &nbsp; Marketing is the foundation of business operations for businesses and nonprofit organizations. Understanding the various marketing services and their functions helps the profitable or nonprofit organization reach their goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="marketingRole  bg-white">
                <div className="container">
                    <div className="row pb-5  text-dark" >
                        <div className="row py-5">
                            <h2 className="h2" style={{fontWeight: 900}}>
                                Marketing's role in Premium
                            </h2>
                        </div>
                        <div className="row pb-5">
                            <p className="allDescription">
                                &nbsp; Here in premium we start marketing our name to the newcomers, spreading premium's name all over the faculty, then continues the year with marketing to our upcoming events like journeys, sessions, etc.
                                <br/>&nbsp; It's Marketing team's role to attract people either for applying to be a member with us or attract them to join us in our events.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="marketing-description">
                <div className="container">
                    <div className="row pb-5  text-light" >
                        <div className="row py-5">
                            <h1 className="h2" style={{fontWeight: 900}}>
                                Skills obtained
                            </h1>
                        </div>
                        <div className="row pb-5">
                            <ul className="allDescription">
                                <li>Breaking the barrier of fear and dread of talking.</li>
                                <li>Increase self-confidence.</li>
                                <li>Building a personal style for your marketing.</li>
                                <li>Helping a person to be social.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="marketingTeam">
                <div className="container">
                    <div className="align-items-center">
                        <div className="py-5">
                            <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                                Marketing Team
                            </h1>
                        </div>
                        <div className="marketingPicDiv">
                            <div className="marketingPic">
                                <img src={images["Marketing.jpeg"]} alt="" className="myImg img-fluid" />
                            </div>
                            <div id="myModal" className="modal">

                                <span className="close">&times;</span>
                            
                                <img className="modal-content" id="img01" />
                            
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
 
export default MarketingCommittee;