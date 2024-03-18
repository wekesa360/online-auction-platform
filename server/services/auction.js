import { Auction as AuctionModel } from "../models/auction.js";
import CustomError from "../helpers/custom-error.js";

export const auctionService = {
  createAuction,
  getAll,
  getById,
  update,
  _delete,
};

async function createAuction(auctionParam) {
  const auction = new AuctionModel(auctionParam);
  await auction.save();
}

async function getAll() {
  return await AuctionModel.find().populate('auctioneer'); 
}

async function update(id, auctionParam) {
  const auction = await AuctionModel.findById(id);
  if (!auction) throw new CustomError("Auction not found", 404);
  Object.assign(auction, auctionParam);
  await auction.save();
}

async function _delete(id) {
  await AuctionModel.findByIdAndRemove(id);
}

export default auctionService;
