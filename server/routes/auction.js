import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
import auctionController from "../controllers/auction.js";
import multer from 'multer';

const router = Router();

const upload = multer({ dest: 'uploads/' });


router.get(
  "/auction",
  auctionController.getAll
);
router.get(
  "/auction/:id",
  authenticate,
  authorize(["user", "admin"]),
  auctionController.getById
);
router.post(
  "/auction",
  authenticate,
  authorize(["admin"]),
  upload.single('image'),
  auctionController.createAuction
);
router.put(
  "/auction/:id",
  authenticate,
  authorize(["admin"]),
  auctionController.update
);
router.delete(
  "/auction/:id",
  authenticate,
  authorize(["admin"]),
  auctionController._delete
);

router.get('auction/:id/image', auctionController.getAuctionImage);

export default router;
