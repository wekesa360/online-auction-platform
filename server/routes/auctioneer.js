import express from 'express';
import { createAuctioneer, getAuctioneerById, getAllAuctioneers, updateAuctioneer, deleteAuctioneer } from '../controllers/auctioneerController.js';
import { authorize } from '../middlewares/authorize.js';

const router = express.Router();

// Routes for Auctioneers
router.post('/auctioneers', authorize(['admin']), createAuctioneer);
router.get('/auctioneers/:id', getAuctioneerById);
router.get('/auctioneers', getAllAuctioneers);
router.put('/auctioneers/:id', authorize(['admin']), updateAuctioneer);
router.delete('/auctioneers/:id', authorize(['admin']), deleteAuctioneer); 

export default router;
