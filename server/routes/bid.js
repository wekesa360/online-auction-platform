import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
import bidController from "../controllers/bid.js";

const router = Router();

router.get(
  "/bid",
  authenticate,
  authorize(["user", "admin"]),
  bidController.getAll
);
router.get(
  "/bid/:id",
  authenticate,
  authorize(["user", "admin"]),
  bidController.getById
);

router.post(
  "/bid",
  authenticate,
  authorize(["user"]),
  bidController.createBid
);
router.put(
  "/bid/:id",
  authenticate,
  authorize(["user"]),
  bidController.update
);

router.delete(
  "/bid/:id",
  authenticate,
  authorize(["user"]),
  bidController._delete
);

export default router;
