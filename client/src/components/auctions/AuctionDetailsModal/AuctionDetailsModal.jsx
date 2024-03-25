import React from 'react';
import './AuctionDetailsModal.css';

const AuctionDetailsModal = ({ auction, onClose }) => {
  if (!auction) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{auction.title}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <img src={auction.imageUrl} alt={auction.title} className="modal-image" />
          <p>{auction.description}</p>
          <p>Current Bid: {auction.currentBid}</p>
          <p>Bid Ends: {auction.bidEnds}</p>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailsModal;