import { Router } from 'express';
import { register, login } from '../controllers/auth.js';
import validate from '../middlewares/validate.js';
import { registerSchema, loginSchema } from '../schemas/auth.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;