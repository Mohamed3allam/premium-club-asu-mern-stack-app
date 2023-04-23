import React, { useEffect } from "react";
import Slider from "react-slick";
import $ from 'jquery';
import '../../css/slick.css';
import '../../css/slick-theme.css';
import '../../css/imgSize.css'

export default function SimpleSliderFinalConference({images}) {
    const settings = {
      dots: true,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      waitForAnimate: true,
      draggable: true,
      touchMove: true,
      swipe: true,
    };




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

    // Get the modal

    return (
            <>
                <div className="slider">
                    <Slider {...settings} className="single-item">
                        <div className="conferencePics">
                            <img src={images['conference1.jpg']} className=" myImg img-fluid" />
                        </div>
                        <div className="conferencePics">
                            <img src={images['conference2.jpg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="conferencePics">
                            <img src={images['mahmoudHassan.jpeg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="conferencePics">
                            <img src={images['antika.jpeg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="conferencePics">
                            <img src={images['conference3.jpg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="conferencePics">
                            <img src={images['conference4.jpg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="conferencePics">
                            <img src={images['conference5.jpg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="conferencePics">
                            <img src={images['conference6.jpg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="conferencePics">
                            <img src={images['conference7.jpg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="conferencePics">
                            <img src={images['conference8.jpg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="conferencePics">
                            <img src={images['conference9.jpg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="conferencePics">
                            <img src={images['conference10.jpg']}  className=" myImg img-fluid" />
                        </div>
                    </Slider>
                </div>
                <div className="sliderDescription">
                    <div className="py-5 mobileHeader">
                        <h2 className="h2 text-dark" style={{fontWeight: 900}}>
                            Final Conference
                        </h2>
                    </div>
                    <div className="conference-description">
                        <p className="lead">
                            After Those Sessions there is a conference set for our teams to present their final project in a formal way to prepare them for after graduation.                                </p>
                    </div>
                </div>
                <div id="myModal" className="modal">

                    <span className="close">&times;</span>

                    <img className="modal-content" id="img01" />

                    <div id="caption"></div>
                </div>
            </>
    );
  }