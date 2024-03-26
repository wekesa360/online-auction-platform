import express from 'express';
import { createAuctioneer, getAuctioneerById, getAllAuctioneers, updateAuctioneer, deleteAuctioneer } from '../controllers/auctioneer.js';
import { authorize } from '../middlewares/authorize.js';
import { authenticate } from "../middlewares/auth.js";


const router = express.Router();

// Routes for Auctioneers
router.post('/auctioneers', authenticate, authorize(['admin']), createAuctioneer);
router.get('/auctioneers/:id', authenticate, getAuctioneerById);
router.get('/auctioneers', authenticate, getAllAuctioneers);
router.put('/auctioneers/:id', authenticate, authorize(['admin']), updateAuctioneer);
router.delete('/auctioneers/:id', authenticate, authorize(['admin']), deleteAuctioneer);

export default router;
