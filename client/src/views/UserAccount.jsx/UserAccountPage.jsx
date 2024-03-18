import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileSection from './ProfileSection';
import CurrentBidsSection from './CurrentBidsSection';
import BidHistorySection from './BidHistorySection';
import PlaceBidForm from './PlaceBidForm';

const UserAccountPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [userProfile, setUserProfile] = useState(null);
  const [currentBids, setCurrentBids] = useState([]);
  const [bidHistory, setBidHistory] = useState([]);

  useEffect(() => {
    fetchUserProfile();
    fetchCurrentBids();
    fetchBidHistory();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/profile');
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchCurrentBids = async () => {
    try {
      const response = await axios.get('/bid');
      setCurrentBids(response.data);
    } catch (error) {
      console.error('Error fetching current bids:', error);
    }
  };

  const fetchBidHistory = async () => {
    try {
      const response = await axios.get('/bid/history');
      setBidHistory(response.data);
    } catch (error) {
      console.error('Error fetching bid history:', error);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection userProfile={userProfile} onProfileUpdate={fetchUserProfile} />;
      case 'currentBids':
        return <CurrentBidsSection currentBids={currentBids} />;
      case 'bidHistory':
        return <BidHistorySection bidHistory={bidHistory} />;
      case 'placeBid':
        return <PlaceBidForm onBidPlaced={fetchCurrentBids} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <header>
        {/* Header component */}
      </header>
      <div className="user-account-page container">
        <div className="row">
          <nav className="col-3 mt-4">
            <ul className="nav flex-column">
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => handleSectionChange('profile')}>Profile</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => handleSectionChange('currentBids')}>Current Bids</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => handleSectionChange('bidHistory')}>Bid History</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => handleSectionChange('placeBid')}>Place Bid</button>
              </li>
            </ul>
          </nav>
          <main className="col-9 mt-4">{renderSection()}</main>
        </div>
      </div>
      <footer>
        {/* Footer component */}
      </footer>
    </div>
  );
};

export default UserAccountPage;