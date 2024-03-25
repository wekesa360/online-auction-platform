import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./AuctionCard.css";
import { placeBid } from "../../../store/actions";

const AuctionCard = ({
  id,
  imageUrl,
  title,
  description,
  currentBid,
  bidEnds,
  onReadMoreClick,
}) => {
  const dispatch = useDispatch();

  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState("");

  const handleBidFormToggle = () => {
    setShowBidForm(!showBidForm);
  };

  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    dispatch(placeBid(id, bidAmount));

    setBidAmount("");
    setShowBidForm(false);
  };

  return (
    <div className="col-lg-4">
      <div className="auction-card">
        <img src={imageUrl} alt={title} />
        <div className="auction-details">
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="bid-info">
            <span className="current-bid">Current Bid: {currentBid}</span>
            <span className="bid-ends">Bid Ends: {bidEnds}</span>
          </div>
          <br />
          {!showBidForm && (
            <button className="bid-btn" onClick={handleBidFormToggle}>
              Place Bid
            </button>
          )}
          {showBidForm && (
            <form className="bid-form" onSubmit={handleBidSubmit}>
              <input
                type="number"
                className="form-group"
                value={bidAmount}
                onChange={handleBidAmountChange}
                placeholder="Enter your bid"
                required
              />
              <button type="submit" className="btn btn-primary">
                Submit Bid
              </button>
            </form>
          )}
          {showBidForm && (
            <button className="close-btn" onClick={handleBidFormToggle}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
