import { Bid as bidModel } from "../models/bid.js";
import { User } from "../models/user.js";
import { Auction } from "../models/auction.js";
import CustomError from "../helpers/custom-error.js";

export const bidService = {
  createBid,
  getBids,
  getBid,
  updateBid,
  _delete,
};

async function createBid(bidParam) {
  console.log("bidParam", bidParam);
  const { auctionId, amount, userId, createdAt } = bidParam;
  const auction = await Auction.findById(auctionId).populate(
    "createdBy",
    "username"
  );
  if (!auction) {
    throw new CustomError("Auction not found", 404);
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  if (amount < auction.minimumBid) {
    throw new CustomError("Bid amount is less than the minimum bid", 400);
  }
  const bid = new bidModel({
    amount,
    auction: auctionId,
    bidder: userId,
    timestamp: createdAt,
  });
  const savedBid = await bid.save();
  auction.bids = auction.bids.concat(savedBid._id);
  await auction.save();
  return savedBid;
}

async function getBids() {
  return await bidModel
    .find()
    .populate("auction")
    .populate("bidder", "username");
}

async function updateBid(id, bidParam) {
  const bid = await bidModel.findById(id);
  if (!bid) {
    throw new CustomError("Bid not found", 404);
  }
  Object.assign(bid, bidParam);
  await bid.save();
}

async function getBid(id) {
  const bid = await bidModel
    .findById(id)
    .populate("auction")
    .populate("bidder");
  if (!bid) {
    throw new CustomError("Bid not found", 404);
  }
  return bid;
}

async function _delete(id) {
  console.log("We are here in delete bid")
  await bidModel.findByIdAndDelete(id);
}

export default bidService;
