import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAuctioneer,setIsRegisteredNow } from "../../store/actions";
import "./Auctioneer.css";
import { useNavigate } from "react-router-dom";
import Toast from "../common/Toast/Toast";

const AuctioneerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    contact: "",
    establishedYear: "",
    logoUrl: "",
  });

  const [contactValid, setContactValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuctioneerCreated, error } = useSelector((state) => state.auctioneer);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "contact") {
      validateContact(e.target.value);
    }
  };

  const validateContact = (contact) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^\+?\d{1,3}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    setContactValid(emailRegex.test(contact) || phoneRegex.test(contact));
  };

  const handleCreateAuctioneer = async (e) => {
    e.preventDefault();
    if (contactValid) {
      try {
        await dispatch(createAuctioneer(formData));
      } catch (error) {
        Toast.error("Failed to register auctioneer. Please try again.");
        console.error("Failed to register auctioneer", error.message);
      }
    } else {
      Toast.error("Please enter a valid email or phone number with country code.");
    }
  };

  useEffect(() => {
    if (isAuctioneerCreated) {
      dispatch(setIsRegisteredNow(false));
      Toast.success("Auctioneer registered successfully!");
      navigate("/");
    } else if (error && error.message) {
      Toast.error(error.message);
    }
  }, [isAuctioneerCreated, error, navigate, dispatch]);

  return (
    <div className="auctioneer-form-container">
      <div className="auctioneer-form-card ">
        <h1 className="auctioneer-form-title">
          Register organization as Auctioneer
        </h1>
        <form onSubmit={handleCreateAuctioneer}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name of Organization"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="establishedYear"
              placeholder="Established Year"
              value={formData.establishedYear}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="contact"
                  placeholder="Company Contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                {/* <input
                  type="text"
                  className="form-control"
                  name="logoUrl"
                  placeholder="Logo URL"
                  value={formData.logoUrl}
                  onChange={handleChange}
                  required
                /> */}
              </div>
            </div>
          </div>

          {error && <p className="error-message">{error.message}</p>}
          <button type="submit" className="btn btn-primary auctioneer-form-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuctioneerForm;
