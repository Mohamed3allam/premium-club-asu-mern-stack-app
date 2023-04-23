import React, {useEffect} from 'react';
import '../../css/hr.css';
import ScrollHandle from "../../js/Scroll";
import $ from 'jquery';
import {Helmet} from "react-helmet";
import FirebaseActivation from '../../js/FirebaseActivation';
import ClientNavbar from "../components/ClientNavbar";
import FooterNew from '../components/FooterNew';





const HumanResourcesCommittee = ({images}) => {


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
                    <meta property="og:title" content="Human Resources Committee" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://www.premium-club-asu.org/committees/human-resources" />
                    <meta property="og:image" content={images["premiumClubLogoTextMouse.png"]} />
                    
                    <title> Human Resources Committee </title>

                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta name="description" content="Premium Club is a Nonprofit Organization and one of the leading student activities in faculty of Commerce Ain shams University."/>
                    <meta name="keywords" content="premium club,premium, premium club asu, club, asu, بريميم, premium student activity, student activity, كلية تجارة"/>
                        
                </Helmet>
            </div>
            <ClientNavbar images={images}/>
            <section className="hr-description">
                <div className="container">
                    <div className="row py-5  text-light" >
                        <div className="row py-5">
                            <h1 className="h1" style={{fontWeight: 900,fontSize: '50px'}}>
                                Human Resources Committee
                            </h1>
                        </div>
                        <div className="row py-5">
                            <h2 className="h2" style={{fontWeight: 900}}>
                                What is Human Resources
                            </h2>
                        </div>
                        <div className="row pb-5">

                            <p className=" allDescription">
                                &nbsp; Human Resources is not just a job, it's a field that is divided into many majors, like Recruiting and staffing , Employee benefits, Internal relations, Organizational structure, Training and development.
                                <br/>And each one of them has it's important role in the organization for tracking employees evaluation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="hrRole  bg-white">
                <div className="container">
                    <div className="row pb-5  text-dark" >
                        <div className="row py-5">
                            <h2 className="h2" style={{fontWeight: 900}}>
                                Human Resources's role in Premium
                            </h2>
                        </div>
                        <div className="row pb-5">
                            <p className="allDescription">
                                In premium it's not about employees, it's about our members, so that hr's role is to Plan and manage recruitment and selection of members,
                                Identifying and managing training and development needs for members, Evaluating and updating members rules and regulations, Planning and putting strategies to get the best use of members' talents, and eventually Having a discussion with members who aren't keeping up after receiving many warnings.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="hr-description">
                <div className="container">
                    <div className="row pb-5  text-light" >
                        <div className="row py-5">
                            <h1 className="h2" style={{fontWeight: 900}}>
                                Skills obtained
                            </h1>
                        </div>
                        <div className="row pb-5">
                            <ul className="allDescription">
                                <span style={{fontWeight: 'bold'}}>Communication skills</span><br/>
                                as an HR you'll be able to express yourself clearly both in oral and written communication.
                                <br/><br/> <span style={{fontWeight: 'bold'}}>Decision making</span><br/>
                                during recruitment you have to decide whether an applicant is suitable for the role or not.
                                <br/><br/> <span style={{fontWeight: 'bold'}}>Training and development </span> <br/>
                                HR is responsible for giving members development opportunities to maximize performance and improve value.
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="hrTeam">
                <div className="container">
                    <div className="align-items-center">
                        <div className="py-5 ">
                            <h1 className="h1 text-dark text-center" style={{fontWeight: 900}}>
                                Human Resources Team
                            </h1>
                        </div>
                        <div className="hrPicDiv">
                            <div className="hrPic">
                                <img src={images['HR.jpeg']} alt="" className="myImg img-fluid"/>
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
 
export default HumanResourcesCommittee;