import { Router } from "express";
import { register, login, getAuthUser } from "../controllers/auth.js";
import validate from "../middlewares/validate.js";
import { authenticate } from "../middlewares/auth.js";

import { registerSchema, loginSchema } from "../schemas/auth.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
// router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getAuthUser);

export default router;
