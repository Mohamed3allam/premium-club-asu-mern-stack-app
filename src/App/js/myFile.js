import $ from 'jquery';
import { useEffect } from 'react';

// NAVBAR SCROLLLLL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function NavF() {
  useEffect(() => {
    // 👇️ call method in useEffect hook
    const navbar = document.getElementById('navbar');
    console.log(navbar);
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      console.log('test1');
      $(navbar).style.backgroundImage = "none";
      $(navbar).style.backgroundColor = "#262b2f";
      $(navbar).style.transition = "0.5s";
      $(navbar).style.boxShadow = "0px 0px 20px black";
  
    } else {
      console.log('test');
      $(navbar).style.backgroundImage = "linear-gradient(to bottom, rgba(0,0,0) ,rgba(0,0,0,0.9),rgba(0,0,0,0.7),rgba(0,0,0,0.5),  transparent)";
      $(navbar).style.backgroundColor = "unset";
      $(navbar).style.transition = "0.5s";
      $(navbar).style.boxShadow = "none";
    }
  }, []);

  
}
// window.onScroll(()=>{NavF()})

console.log('test out fun')



// INTROOOO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



const intro = document.getElementById('intro');
let site = document.getElementById('site');


$(document).ready(function(){
  $(intro).fadeIn();
  $(intro).fadeOut(2700,);
  setTimeout(() => {
      // $(intro).fadeOut("slow");
      $(site).fadeIn("slow");
      $("#identifier").fadeIn("slow");
      $(intro).remove();
  }
  , 2750)
});



// IMG SIZE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.querySelectorAll(".myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
// img.onclick = function(){
//   modal.style.display = "block";
//   modalImg.src = this.src;
//   captionText.innerHTML = this.alt;
//   console.log(this)
// }
// function imgSize(){
//     modal.style.display = "block";
//     modalImg.src = this.src;
//     captionText.innerHTML = this.alt;
//     console.log(this)
//   }
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
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
$(span).onclick = function() {
  modal.style.display = "none";
} 

export default NavF();