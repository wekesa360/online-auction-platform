import { Schema, model } from 'mongoose';

const AuctioneerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the auctioneer'],
    unique: [true, 'Auctioneer name must be unique'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the auctioneer'],
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  auctions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Auction',
    },
  ],
  location: {
    type: String,
    required: [true, 'Please provide a location for the auctioneer'],
  },
  contact: {
    type: String,
    required: [true, 'Please provide a contact information for the auctioneer'],
  },
  website: {
    type: String,
    required: [true, 'Please provide a website URL for the auctioneer'],
  },
  establishedYear: {
    type: Number,
    required: [true, 'Please provide the year the auctioneer was established'],
  },
  logoUrl: {
    type: String,
    required: [true, 'Please provide a logo URL for the auctioneer'],
  },
});

AuctioneerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Auctioneer = model('Auctioneer', AuctioneerSchema);
