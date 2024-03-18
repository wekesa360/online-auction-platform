// AuctionListing.js
import React from 'react';
import AuctionCard from '../AuctionCard/AuctionCard'; // Import the AuctionCard component
import './AuctionListing.css';

const AuctionListing = () => {
  return (
    <div className="auction-listing">
      <div className="listing-header">
        <h1>Auction Listings</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search for auctions..." />
          <button>Search</button>
        </div>
      </div>
      <div className="auction-cards">
        <div className='row'>
        <AuctionCard
          imageUrl="property1.jpg"
          title="Luxury Villa"
          description="Lorem ipsum , consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
          currentBid="$500,000"
          bidEnds="May 15, 2023"
        />
        <AuctionCard
          imageUrl="property1.jpg"
          title="Luxury Villa"
          description="Lorem ipsum , consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
          currentBid="$500,000"
          bidEnds="May 15, 2023"
        />
        <AuctionCard
          imageUrl="property1.jpg"
          title="Luxury Villa"
          description="Lorem ipsum , consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
          currentBid="$500,000"
          bidEnds="May 15, 2023"
        />
        <AuctionCard
          imageUrl="property1.jpg"
          title="Luxury Villa"
          description="Lorem ipsum , consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
          currentBid="$500,000"
          bidEnds="May 15, 2023"
        />
        <AuctionCard
          imageUrl="property1.jpg"
          title="Luxury Villa"
          description="Lorem ipsum , consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
          currentBid="$500,000"
          bidEnds="May 15, 2023"
        />
        <AuctionCard
          imageUrl="property1.jpg"
          title="Luxury Villa"
          description="Lorem ipsum , consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
          currentBid="$500,000"
          bidEnds="May 15, 2023"
        />
        </div>
      </div>
    </div>
  );
};

export default AuctionListing;



<AuctionCard
          imageUrl="property1.jpg"
          title="Luxury Villa"
          description="Lorem ipsum , consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
          currentBid="$500,000"
          bidEnds="May 15, 2023"
        />