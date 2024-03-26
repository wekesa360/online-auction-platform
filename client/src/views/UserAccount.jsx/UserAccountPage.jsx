import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";
import BidsManagement from "./BidsManagement"; // Import the BidsManagement component

const UserAccountPage = () => {
  const [profile, setProfile] = useState(null);
  const [bids, setBids] = useState([]);
  const [activeSection, setActiveSection] = useState("Manage Your Bids");

  useEffect(() => {
    fetchProfile();
    fetchBids();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/profile");
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchBids = async () => {
    try {
      const response = await axios.get("/bids");
      setBids(response.data);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "Your Bids":
        return <BidsManagement bids={bids} />; // Render BidsManagement component
      // case "Profile":
      //   return <Profile profile={profile} />; // Render Profile component
      // case "Manage Account":
      //   return <ManageAccount onDeleteAccount={deleteAccount} />; // Render ManageAccount component
      default:
        return null;
    }
  };

  const deleteAccount = async () => {
    try {
      // Add logic to delete the user account
      console.log("User account deleted successfully!");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div>
      <header></header>

      <div className="admin-page">
        <div className="">
          <div className="row">
            <div className="col-lg-4 d-flex justify-content-end">
              <div className="sidebar">
                <div className="sidebar-sticky">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <button
                        className="nav-link btn btn-link text-start"
                        onClick={() => handleSectionChange("Your Bids")}
                      >
                        <i className="bi bi-currency-dollar"></i> Manage Your
                        Bids
                      </button>
                    </li>
                    {/* <li className="nav-item">
                      <button
                        className="nav-link btn btn-link text-start"
                        onClick={() => handleSectionChange("Profile")}
                      >
                        <i className="bi bi-person"></i> Profile
                      </button>
                    </li> */}
                    {/* <li className="nav-item">
                      <button
                        className="nav-link btn btn-link text-start"
                        onClick={() => handleSectionChange("Manage Account")}
                      >
                        <i className="bi bi-gear"></i> Manage Account
                      </button>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-8 px-5 py-5">
              <main className="col-9 mt-4 render-section">
                {renderSection()}
              </main>
            </div>
          </div>
        </div>
      </div>

      <footer></footer>
    </div>
  );
};

export default UserAccountPage;
