import React from 'react';

const BidHistorySection = ({ bidHistory }) => {
  return (
    <div>
      <h2>Bid History</h2>
      {bidHistory.length === 0 ? (
        <p>You have no bid history.</p>
      ) : (
        <ul className="list-group">
          {bidHistory.map((bid) => (
            <li key={bid.id} className="list-group-item">
              <div>Auction: {bid.auction.title}</div>
              <div>Amount: {bid.amount}</div>
              <div>Status: {bid.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BidHistorySection;