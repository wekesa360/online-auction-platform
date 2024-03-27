import React, { useState, useEffect } from "react";
import AuctionCard from "../AuctionCard/AuctionCard";
import AuctionDetailsModal from "../AuctionDetailsModal/AuctionDetailsModal";
import "./AuctionListing.css";
import auctionService from "../../../services/auctionService";

const AuctionListing = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await auctionService.getAllAuctions();
        const updatedAuctions = data.map((auction) => ({
          ...auction,
          bidStarts: `${auction.startingDate} ${auction.startingTime}`,
          bidEnds: formatDateAndTime(auction.endDate, auction.endTime),
          currentBid: auction.bids.length > 0 ? `Ksh ${auction.bids[0].amount.toLocaleString()}` : "Ksh 0",
        }));
        setAuctions(updatedAuctions);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    fetchData();
    const interval = setInterval(fetchData, 30000);
  
    return () => clearInterval(interval);
  }, []);

  function formatDateAndTime(date, time) {
    const auctionDateTime = `${date}T${time}`;
    const formattedDateTime = `${
      auctionDateTime.toString().split("T")[0]
    } at ${time}`;
    return formattedDateTime;
  }

  const handleReadMoreClick = (auction) => {
    setSelectedAuction(auction);
  };

  const handleCloseModal = () => {
    setSelectedAuction(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAuctions = auctions.filter((auction) =>
    auction.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="auction-listing">
      <div className="listing-header">
        <h1>Auction Listings</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for auctions..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
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
            {filteredAuctions.map((auction) => (
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
