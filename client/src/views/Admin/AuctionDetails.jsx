import React, { useState, useEffect } from "react";
import axios from "axios";

const AuctionDetails = ({ auction }) => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      const response = await axios.get(`/bid?auctionId=${auction.id}`);
      setBids(response.data);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  if (!auction) {
    return <div>Select an auction to view details</div>;
  }

  return (
    <div>
      <h2>{auction.title}</h2>
      <p>{auction.description}</p>
      <p>Starting Bid: {auction.startingBid}</p>

      <h3>Current Bids</h3>
      {bids.length === 0 ? (
        <p>No bids yet</p>
      ) : (
        <ul className="list-group">
          {bids.map((bid) => (
            <li key={bid.id} className="list-group-item">
              <div>Bidder: {bid.user.name}</div>
              <div>Amount: {bid.amount}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuctionDetails;
