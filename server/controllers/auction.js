import auctionService from "../services/auction.js";
import {auctioneerService} from "../services/auctioneer.js";
import CustomError from "../helpers/custom-error.js";
import { io } from '../server.js';

const auctionController = {
  createAuction,
  getAll,
  getById,
  update,
  _delete,
};

async function createAuction(req, res, next) {
  try {
    const auctioneer = await auctioneerService.getAuctioneerByUserId(req.user._id);
    console.log(auctioneer);
    if (auctioneer) {
      req.body.auctioneer = auctioneer;
    } else {
      throw new CustomError('Auctioneer not found', 404);
    }

    await auctionService.createAuction(req.body);
    res.status(201).json({ message: "Auction created successfully" });

    // Emit a WebSocket event when a new auction is created
    io.getIO().emit('auctions', { action: 'create', auction: req.body });
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const auctions = await auctionService.getAll();
    res.json(auctions);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const auction = await auctionService.getById(req.params.id);
    res.json(auction);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    await auctionService.update(req.params.id, req.body);
    res.json({ message: "Auction updated successfully" });
  } catch (error) {
    next(error);
  }
}

async function _delete(req, res, next) {
  try {
    await auctionService._delete(req.params.id);
    res.json({ message: "Auction deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export default auctionController;
