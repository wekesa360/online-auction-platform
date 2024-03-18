import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Auction Platform
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/auctions">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auction-listing">
                Active listing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auctions">
                Auctioneers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
        <Link className="nav-link" to="/admin">
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
