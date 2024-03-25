import React from "react";
import "./AuctionDetailsModal.css";

const AuctionDetailsModal = ({ auction, onClose }) => {
  if (!auction) {
    return null;
  }

  return (
    <div className="modal-overlay d-flex justify-content-center">
      <div className="modal">
        <div className="modal-header d-flex">
          <h2>{auction.title} </h2>{" "}
          <button className="close-btn justify-content-end" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <img
            src={auction.imageUrl}
            alt={auction.title}
            className="modal-image"
          />
          <p>{auction.description}</p>
          {auction.currentBid !== "Ksh KshNaN" &&
            !Number.isNaN(Number(auction.currentBid)) && (
              <p>Current Bid: {auction.currentBid}</p>
            )}

          <p>Bid Ends: {auction.bidEnds}</p>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailsModal;
