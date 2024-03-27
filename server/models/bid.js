import { Schema, model } from 'mongoose';

const BidSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Please provide an amount'],
    },
    auction: {
        type: Schema.Types.ObjectId,
        ref: 'Auction',
    },
    bidder: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    timestamp: { type: Date, default: Date.now },

    status: {
        type: Boolean,
        default: false,
    },
});

BidSchema.set(
    'toJSON',
    {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id;
            delete returnedObject._id;
            delete returnedObject.__v;
        },
    }
);


export const Bid = model('Bid', BidSchema);