import React from "react";
import { Link } from "react-router-dom"; // Import Link component
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-flex align-items-center">
            <div className="content">
              <h1>Bid Your Dream Place.</h1>
              <p>
                Finding Your Dream Home Now Is Quite Difficult, But We Can Help
                You. Made Your Dreams Come True. Come Find Your Dream House With
                Us.
              </p>
              <div className="buttons">
                {/* <button className="contact-btn">Contact Us</button> */}
                <Link to="/auction-listing" className=" btn btn-primary">
                  Live Auctions
                </Link>{" "}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hexagon-container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="hexagon"></div>
                  <div className="hexagon"></div>
                </div>
              </div>
              <div className="hexagon-last"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
