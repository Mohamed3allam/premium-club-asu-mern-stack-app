import React, { Component,useEffect } from "react";
import Slider from "react-slick";
import $ from 'jquery';
import '../../css/slick.css';
import '../../css/slick-theme.css';
import '../../css/imgSize.css'

export default function SimpleSliderOrientation({images}) {
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
    const img = document.querySelectorAll(".myImg");
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
                <div className="sliderDescription">
                    <div className="py-5 mobileHeader">
                        <h2 className="h2 text-dark" style={{fontWeight: 900}}>
                            Orientation Day (2021-2022)
                        </h2>
                    </div>
                    <div className="orientation-description">
                        <p className="lead">
                            In the orientation day we start presenting our Highboard , Premium founders and every committee's head and their vice head. and we tell our members every committee's role and it's responsibility.
                        </p>
                    </div>
                </div>
                <div className="slider">
                    <Slider {...settings} className="single-item">
                        <div className="orientationPics">
                            <img src={images['orientation2021.jpg']} className=" myImg img-fluid" />
                        </div>
                        <div className="orientationPics">
                            <img src={images['orientation1.jpeg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="orientationPics">
                            <img src={images['orientation2.jpeg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="orientationPics">
                            <img src={images['orientation3.jpeg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="orientationPics">
                            <img src={images['orientation4.jpeg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="orientationPics">
                            <img src={images['orientation5.jpeg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="orientationPics">
                            <img src={images['orientation6.jpeg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="orientationPics">
                            <img src={images['orientation7.jpeg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="orientationPics">
                            <img src={images['orientation8.jpeg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="orientationPics">
                            <img src={images['orientation9.jpeg']}  className=" myImg img-fluid" />
                        </div>
                    </Slider>
                </div>
                
                <div id="myModal" className="modal">

                    <span className="close">&times;</span>

                    <img className="modal-content" id="img01" />

                    <div id="caption"></div>
                </div>
            </>
    );
  }