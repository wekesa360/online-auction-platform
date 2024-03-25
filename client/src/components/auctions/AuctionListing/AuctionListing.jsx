import React, { useState, useEffect } from 'react';
import AuctionCard from '../AuctionCard/AuctionCard';
import AuctionDetailsModal from '../AuctionDetailsModal/AuctionDetailsModal';
import './AuctionListing.css';
import auctionService from '../../../services/auctionService';

const AuctionListing = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAuction, setSelectedAuction] = useState(null);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const data = await auctionService.getAllAuctions();
      const updatedAuctions = data.map((auction) => ({
        ...auction,
        bidStarts: `${auction.startingDate} ${auction.startingTime}`,
        bidEnds: `${auction.endDate} ${auction.endTime}`,
        currentBid: auction.bids.length > 0 ? auction.bids[0].amount : 0, // Extract currentBid from bids array
      }));
      setAuctions(updatedAuctions);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleReadMoreClick = (auction) => {
    setSelectedAuction(auction);
  };

  const handleCloseModal = () => {
    setSelectedAuction(null);
  };

  return (
    <div className="auction-listing">
      <div className="listing-header">
        <h1>Auction Listings</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search for auctions..." />
          <button>Search</button>
        </div>
      </div>
      <div className="auction-cards">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="row">
            {auctions.map((auction) => (
              <AuctionCard
                key={auction._id}
                id={auction._id}
                imageUrl={auction.imageUrl}
                title={auction.title}
                description={auction.description}
                currentBid={auction.currentBid}
                bidEnds={auction.bidEnds}
                bidStart={auction.bidStart}
                onReadMoreClick={() => handleReadMoreClick(auction)}
              />
            ))}
          </div>
        )}
      </div>
      {selectedAuction && (
        <AuctionDetailsModal
          auction={selectedAuction}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AuctionListing;
