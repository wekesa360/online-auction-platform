import React, { useState } from "react";
import "./AdminPage.css";
import BidsManagement from "./BidsManagement";
import ProfileManagement from "../../components/profile/Profile";

const UserAccountPage = () => {
  const [activeSection, setActiveSection] = useState("Manage Your Bids");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "Your Bids":
        return <BidsManagement />; // Render BidsManagement component
      case "Profile":
        return <ProfileManagement />; // Render Profile component
      // case "Manage Account":
      //   return <ManageAccount onDeleteAccount={deleteAccount} />; // Render ManageAccount component
      default:
        return null;
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
                        onClick={() => handleSectionChange("Profile")}
                      >
                        <i className="bi bi-person"></i> Profile
                      </button>
                    </li>
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
