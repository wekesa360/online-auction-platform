import { Auctioneer as AuctioneerModel } from "../models/auctioneer.js";
import CustomError from "../helpers/custom-error.js";

export const auctioneerService = {
  createAuctioneer,
  getAllAuctioneers,
  getAuctioneerById,
  getAuctioneerByUserId,
  updateAuctioneer,
  deleteAuctioneer,
};

async function createAuctioneer(auctioneerParams) {
  const auctioneer = new AuctioneerModel(auctioneerParams);
  await auctioneer.save();
}

async function getAllAuctioneers() {
  return await AuctioneerModel.find();
}


async function getAuctioneerByUserId(userId) {
  return await AuctioneerModel.findOne({ admin: userId });
}

async function getAuctioneerById(id) {
  return await AuctioneerModel.findById(id);
}

async function updateAuctioneer(id, auctioneerParams) {
  const auctioneer = await AuctioneerModel.findById(id);
  if (!auctioneer) throw new CustomError("Auctioneer not found", 404);
  Object.assign(auctioneer, auctioneerParams);
  await auctioneer.save();
}

async function deleteAuctioneer(id) {
  await AuctioneerModel.findByIdAndRemove(id);
}
