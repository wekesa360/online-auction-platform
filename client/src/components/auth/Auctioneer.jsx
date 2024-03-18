import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAuctioneer } from "../../store/actions"; // Import the registerAuctioneer action
import "./Auctioneer.css";
import { useNavigate } from "react-router-dom";

const AuctioneerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    contact: "",
    establishedYear: "",
    logoUrl: "",
  });

  const [error, setError] = useState(null);
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAuctioneer = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createAuctioneer(formData)); // Dispatch the registerAuctioneer action
      navigate("/");
    } catch (error) {
      setError("Failed to register auctioneer. Please try again.");
      console.error("Failed to register auctioneer", error.message);
    }
  };

return (
    <div className="auctioneer-form-container">
        <div className="auctioneer-form-card ">
            <h1 className="auctioneer-form-title">Register organization as Auctioneer</h1>
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
                    <div className="col-md-6">
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
                <input
                  type="text"
                  className="form-control"
                  name="logoUrl"
                  placeholder="Logo URL"
                  value={formData.logoUrl}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-primary auctioneer-form-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuctioneerForm;
