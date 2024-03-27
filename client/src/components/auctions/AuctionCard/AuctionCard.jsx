import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AuctionCard.css";
import { placeBid } from "../../../store/actions";
import Toast from "../../../components/common/Toast/Toast";

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
  const error = useSelector((state) => state.bid.error);
  const auctionErrors = useSelector((state) => state.auction.error);

  const handleBidFormToggle = () => {
    setShowBidForm(!showBidForm);
    if (!showBidForm) {
      Toast.info("Enter your bid amount and submit.");
    }
  };

  useEffect(() => {
    if (error) {
      Toast.error(`Failed: ${error.message}`);
    }
    if (auctionErrors) {
      Toast.error(`Failed: ${auctionErrors.message}`);
    }
    return () => {
      setBidAmount("");
      setShowBidForm(false);
    };
  }
  , [error, auctionErrors]);

  const handleBidAmountChange = (e) => {
    const bidAmount = e.target.value;
    if (bidAmount <= 0) {
      Toast.error("Bid amount must be greater than zero.");
    } else {
      setBidAmount(bidAmount);
    }
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(placeBid(id, bidAmount));
      setBidAmount("");
      setShowBidForm(false);
      Toast.success("Bid placed successfully!");
    } catch (error) {
      Toast.error("Failed to place bid. Please try again.");
    }
  };

  return (
    <div className="col-lg-4">
      <div className="auction-card">
        <img src={imageUrl} alt={title} />
        <div className="auction-details">
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="bid-info">
            <span className="current-bid font-weight-bold">
              <span className="text-primary font-weight-bold">
                Current Bid:
              </span>{" "}
              {currentBid}
            </span>
          </div>
          <div className="bid-info">
            <span className="bid-ends font-weight-bold">
              <span className="text-primary font-weight-bold">Bid Ends:</span>{" "}
              {bidEnds}
            </span>
          </div>
          <br />
          {!showBidForm && (
            <button className="bid-btn" onClick={handleBidFormToggle}>
              Place Bid
            </button>
          )}
          {showBidForm && (
            <form className="bid-form mb-4" onSubmit={handleBidSubmit}>
              <input
                type="number"
                className="form-control"
                value={bidAmount}
                onChange={handleBidAmountChange}
                placeholder="Enter your bid"
                required
              />
              <br />
              <button type="submit" className="btn btn-primary">
                Submit Bid
              </button>
            </form>
          )}
          {/* readmore */}
          {showBidForm && (
            <button className="close-btn my-1" onClick={handleBidFormToggle}>
              Close
            </button>
          )}
          <button
            className="btn btn-outline-primary readmore-btn"
            onClick={onReadMoreClick}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
