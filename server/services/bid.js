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
  const { amount, auctionId, userId } = bidParam;
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
  });
  const savedBid = await bid.save();
  auction.bids = auction.bids.concat(savedBid._id);
  await auction.save();
  return savedBid;
}

async function getBids() {
  return await bidModel
    .find()
    .populate("auction", "title")
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
    .populate("auction", "title")
    .populate("bidder", "username");
  if (!bid) {
    throw new CustomError("Bid not found", 404);
  }
  return bid;
}

async function _delete(id) {
  await bidModel.findByIdAndRemove(id);
}

export default bidService;
