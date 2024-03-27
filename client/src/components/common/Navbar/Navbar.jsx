import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../store/actions";
import Toast from "../../common/Toast/Toast";

import "./Navbar.css";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.user?.role === "admin");

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    Toast.success("Logout successful");
  };


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
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auction-listing">
                Active listing
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link className="nav-link" to="/auctions">
                Auctioneers
              </Link> */}
            </li>
            {isLoggedIn ? (
              <>
                {isAdmin ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      Admin Dashboard
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/user-account">
                      User Dashboard
                    </Link>
                  </li>
                )}
                <button onClick={handleLogout} className="btn btn-primary logout-btn">
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
