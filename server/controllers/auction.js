import auctionService from "../services/auction.js";
import { auctioneerService } from "../services/auctioneer.js";
import CustomError from "../helpers/custom-error.js";
import { io } from '../server.js';
import multer from 'multer';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const auctionController = {
  createAuction,
  getAuctionImage,
  getAll,
  getById,
  update,
  _delete,
};


async function createAuction(req, res, next) {
  try {

    const uploadDirectory = path.join(__dirname, '../uploads'); // Corrected path to the upload directory
    const fileExtension = path.extname(req.file.originalname);
    const filename = `${Date.now()}-${req.file.filename}${fileExtension}`;


    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    fs.renameSync(req.file.path, path.join(uploadDirectory, filename));

    const imageUrl = `http://127.0.0.1:8000/uploads/${filename}`;

    req.body.imageUrl = imageUrl;


    await auctionService.createAuction(req.body);
    res.status(201).json({ message: "Auction created successfully" });

    // Emit a WebSocket event when a new auction is created
    // io.getIO().emit('auctions', { action: 'create', auction: req.body });
  } catch (error) {
    next(error);
  }
}




async function getAll(req, res, next) {
  try {
    let auctions = await auctionService.getAll();

    auctions = auctions.map(auction => {
      if (auction.image) {
        return { ...auction.toObject(), image: undefined };
      } else {
        return auction.toObject();
      }
    });

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

async function getAuctionImage(req, res) {
  try {
    const auction = await auctionService.findById(req.params.id);
    if (!auction || !auction.image) {
      return res.status(404).json({ error: 'Auction or image not found' });
    }

    res.set('Content-Type', auction.image.contentType);
    res.send(auction.image.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default auctionController;
