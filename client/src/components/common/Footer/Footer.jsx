// components/Footer.js
import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Join Newsletter</h3>
          <p>Subscribe our newsletter. Get the latest updates and offers.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="your email" />
            <button type="submit">Submit</button>
          </div>
          <div className="social-icons">
            <a href="#">
              <i>
                <FaFacebook />
              </i>
            </a>
            <a href="#">
              <i>
                <FaTwitter />
              </i>
            </a>
            <a href="#">
              <i>
                <FaLinkedin />
              </i>
            </a>
            <a href="#">
              <i>
                <FaInstagram />
              </i>
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Important Links</h3>
          <ul>
            <li>
              <a href="#">My Account</a>
            </li>
            <li>
              <a href="#">Home</a>
            </li>

            {/* <li>
              <a href="#">About Company</a>
            </li> */}
          </ul>
        </div>
        <div className="footer-section">
          {/* <h3>Help & FAQs</h3> */}
          <ul>
            <li>
              <a href="#">Auction Listings</a>
            </li>
            <li>
              <a href="#">Register</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
            <li>
              <a href="#">Security Information</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Bid Out</h3>
          <ul className="bid-out-form">
            <li> Address: Nairobi, Kenya</li>
            <li>
              <p> Phone: +25470900001</p>
            </li>
            <li>
              <p>Email: auctionplatform@email.com</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024</p>
        <div className="payment-icons">
          <i className="fab fa-cc-visa"></i>
          <i className="fab fa-cc-mastercard"></i>
          <i className="fab fa-cc-paypal"></i>
          <i className="fab fa-cc-apple-pay"></i>
          <i className="fab fa-cc-amazon-pay"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
