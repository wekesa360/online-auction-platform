import React from "react";

const CurrentBidsSection = ({ currentBids }) => {
  return (
    <div>
      <h2>Current Bids</h2>
      {currentBids.length === 0 ? (
        <p>You have no active bids.</p>
      ) : (
        <ul className="list-group">
          {currentBids.map((bid) => (
            <li key={bid.id} className="list-group-item">
              <div>Auction: {bid.auction.title}</div>
              <div>Amount: {bid.amount}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrentBidsSection;
