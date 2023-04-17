import React from "react";

const DashboardLoader = ({images}) => {
  return (
    <>
      <div className="spinner-container">
          <div className="loading-spinner">
              <div className="intro" id="intro">
                  <img src={images['dashboardLoader.gif']} style={{zIndex:"5"}} className="img-fluid" width='200' height='200' />
              </div>
          </div>
      </div>
    </>
  );
}

export default DashboardLoader;