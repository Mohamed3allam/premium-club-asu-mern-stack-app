import React from "react";

const Loader = ({images}) => {
  return (
    <div style={{width:'100%',height:'100vh',backgroundColor:'gray'}} className="spinner-container">
        <div className="loading-spinner">
            <div className="intro" id="intro">
                <img src={images['introNew.gif']} style={{zIndex:"5"}} className="img-fluid" width='200' height='200' />
            </div>
        </div>
    </div>
  );
}

export default Loader;