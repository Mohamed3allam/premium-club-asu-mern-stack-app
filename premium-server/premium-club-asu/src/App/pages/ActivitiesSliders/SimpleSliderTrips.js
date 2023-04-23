import React, { Component,useEffect } from "react";
import Slider from "react-slick";
import $ from 'jquery';
import '../../css/slick.css';
import '../../css/slick-theme.css';
import '../../css/imgSize.css'

export default function SimpleSliderTrips({images}) {
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
                            Trips
                        </h2>
                    </div>
                    <div className="trips-description">
                        <p className="lead">
                            As much work and experience we try to give members, we try to make it easier for members and less stressful by making entertaining events such as trips to different places through the year.
                        </p>
                    </div>
                </div>
                <div className="slider">
                    <Slider {...settings} className="single-item">
                        <div className="openingPics">
                            <img src={images['trips1.jpeg']} className=" myImg img-fluid" />
                        </div>
                        <div className="openingPics">
                            <img src={images['trips2.jpeg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="openingPics">
                            <img src={images['trips3.jpeg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="openingPics">
                            <img src={images['trips4.jpeg']}  className=" myImg img-fluid" />
                        </div>
                        <div className="openingPics">
                            <img src={images['trips5.jpeg']}  className=" myImg img-fluid" />
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