import { Schema, model } from 'mongoose';

const AuctionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    minimumBid: {
        type: Number,
        required: [true, 'Please provide a minimum bid'],
    },
    startingTime: {
        type: String,
        required: [true, 'Please provide a starting time'],
    },
    startingDate: {
        type: Date,
        required: [true, 'Please provide a starting date'],
    },
    endDate: {
        type: Date,
        required: [true, 'Please provide an end date'],
    },
    endTime: {
        type: String,
        required: [true, 'Please provide an end time'],
    },
    startingPrice: {
        type: Number,
        required: [true, 'Please provide a starting price'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image URL'],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    bids: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Bid',
        },
    ],
    auctioneer: {  
        type: Schema.Types.ObjectId,
        ref: 'Auctioneer',
        required: [true, 'Please provide an auctioneer for the auction'],
    },
    });

AuctionSchema.set(
    'toJSON',
    {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id;
            delete returnedObject._id;
            delete returnedObject.__v;
        },
    }
);

export const Auction = model('Auction', AuctionSchema);