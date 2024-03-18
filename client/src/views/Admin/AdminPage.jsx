import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuctionList from './AuctionList';
import AddAuctionForm from './AddAuctionForm';
import AuctionDetails from './AuctionDetails';
import AuctioneerManagement from './AuctioneerManagement';
import './AdminPage.css'

const AdminPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [activeSection, setActiveSection] = useState('auctionList');

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await axios.get('/auction');
      setAuctions(response.data);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'auctionList':
        return <AuctionList auctions={auctions} onAuctionClick={setSelectedAuction} />;
      case 'addAuction':
        return <AddAuctionForm onAuctionAdded={fetchAuctions} />;
      case 'auctionDetails':
        return <AuctionDetails auction={selectedAuction} />;
      case 'auctioneerManagement':
        return <AuctioneerManagement />;
      default:
        return null;
    }
  };

  return (
    <div>
      <header>
        {/* Header component */}
      </header>
      <div className="admin-page">
        <div className="row">
          <nav className="col-3 mt-4 mt-5 px-4 d-flex justify-content-end">
            <ul className="nav flex-column link-column">
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => handleSectionChange('auctionList')}>Auction List</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => handleSectionChange('addAuction')}>Add Auction</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => handleSectionChange('auctioneerManagement')}>Auctioneer Management</button>
              </li>
            </ul>
          </nav>
          <main className="col-9 mt-4 render-section">{renderSection()}</main>
        </div>
      </div>
      <footer>
        {/* Footer component */}
      </footer>
    </div>
  );
};

export default AdminPage;