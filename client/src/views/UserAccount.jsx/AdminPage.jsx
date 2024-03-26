import React, { useState, useEffect } from "react";
import axios from "axios";
import AuctionList from "./AuctionList";
import AddAuctionForm from "./AddAuctionForm";
import AuctionManagement from "./AuctionManagement";
import AuctionDetails from "./AuctionDetails";
import AuctioneerManagement from "./AuctioneerManagement";
import "./AdminPage.css";

const AdminPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [activeSection, setActiveSection] = useState("auctionList");

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await axios.get("/auction");
      setAuctions(response.data);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "auctionList":
        return (
          <AuctionList
            auctions={auctions}
            onAuctionClick={setSelectedAuction}
          />
        );
      // case "addAuction":
      //   return <AuctionManagement onAuctionAdded={fetchAuctions} />;
      case "auctionDetails":
        return <AuctionDetails auction={selectedAuction} />;
      case "auctioneerManagement":
        return <AuctioneerManagement />;
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
                        onClick={() => handleSectionChange("auctionList")}
                      >
                        <i className="bi bi-list-ul"></i> Auction List
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link btn btn-link text-start"
                        onClick={() => handleSectionChange("addAuction")}
                      >
                        <i className="bi bi-plus-circle"></i> Add Auction
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link btn btn-link text-start"
                        onClick={() =>
                          handleSectionChange("auctioneerManagement")
                        }
                      >
                        <i className="bi bi-people"></i> Auctioneer Management
                      </button>
                    </li>
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

export default AdminPage;
