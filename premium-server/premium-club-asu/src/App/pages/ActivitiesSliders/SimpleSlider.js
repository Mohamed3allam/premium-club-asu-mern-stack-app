import React, { Component,useEffect, useState } from "react";
import Slider from "react-slick";
import $ from 'jquery';
import '../../css/slick.css';
import '../../css/slick-theme.css';
import '../../css/imgSize.css'
import config from "../../../config";
import { fetchAndSetAll } from "../../client-fetch-helpers";

export default function SimpleSlider({ images, activity }) {
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

    const [ activityImageArray, setActivityImageArray ] = useState([])
    const premiumApi = config.premiumApi

    useEffect(() => {
        fetchAndSetAll([
            {
                url: `${premiumApi}/activity-api/activity/${activity._id}/images`,
                setter: setActivityImageArray,
            }
        ]).catch(console.error);

        
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
                <div className="sliderDescription" style={{direction:activity.flexDirection === 'row' ? 'rtl' : 'ltr'}}>
                    <div className="py-5 mobileHeader">
                        <h2 className="h2 text-dark" style={{fontWeight: 900}}>
                            {activity.activityTitle}
                        </h2>
                    </div>
                    <div className="activities-description">
                        <p className="lead">
                            {activity.activityDescription}
                        </p>
                    </div>
                </div>
                <div className="slider">
                    <Slider {...settings} className="single-item">
                        {
                            activityImageArray && activityImageArray.map((activityImage) => (
                                <div key={activityImage._id} className="activityPics">
                                    <img src={premiumApi + activityImage.imageUrl} className=" myImg img-fluid" />
                                </div>
                            ))
                        }
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