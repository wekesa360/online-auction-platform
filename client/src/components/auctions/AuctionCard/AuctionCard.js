// AuctionCard.js
import React from 'react';
import './AuctionCard.css'; // Import any CSS styles for the card if needed

const AuctionCard = ({ imageUrl, title, description, currentBid, bidEnds }) => {
  return (
   <div className='col-lg-4'>
     <div className="auction-card">
      <img src={imageUrl} alt={title} />
      <div className="auction-details">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="bid-info">
          <span className="current-bid">Current Bid: {currentBid}</span>
          <span className="bid-ends">Bid Ends: {bidEnds}</span>
        </div>
        <button className="bid-btn">Place Bid</button>
      </div>
    </div> 
   </div>
  );
};

export default AuctionCard;
