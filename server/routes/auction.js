import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
import auctionController from "../controllers/auction.js";

const router = Router();

router.get(
  "/auction",
  authenticate,
  authorize(["user", "admin"]),
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

export default router;
