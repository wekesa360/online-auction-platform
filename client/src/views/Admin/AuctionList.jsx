import React from 'react';

const AuctionList = ({ auctions, onAuctionClick }) => {
  return (
    <div>
      <h2>Auction List</h2>
      <div className="list-group">
        {auctions.map((auction) => (
          <button
            key={auction.id}
            className="list-group-item list-group-item-action"
            onClick={() => onAuctionClick(auction)}
          >
            {auction.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuctionList;