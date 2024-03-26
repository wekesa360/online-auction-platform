import React, { useState } from "react";
import axios from "axios";

const PlaceBidForm = ({ onBidPlaced }) => {
  const [auctionId, setAuctionId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBid = {
        auctionId,
        amount,
      };

      await axios.post("/bid", newBid);
      onBidPlaced();
      resetForm();
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  const resetForm = () => {
    setAuctionId("");
    setAmount("");
  };

  return (
    <div>
      <h2>Place Bid</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="auctionId" className="form-label">
            Auction ID
          </label>
          <input
            type="text"
            className="form-control"
            id="auctionId"
            value={auctionId}
            onChange={(e) => setAuctionId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Bid Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Place Bid
        </button>
      </form>
    </div>
  );
};

export default PlaceBidForm;
