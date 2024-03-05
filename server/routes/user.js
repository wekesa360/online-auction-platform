import { Router } from 'express';
import { authenticate } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import userService from '../services/user.js';

const router = Router();

router.get('/profile', authenticate, authorize(['user']), getProfile);
router.post('/profile', authenticate, authorize(['user']), createProfile);
router.put('/profile', authenticate, authorize(['user']), updateProfile);
router.delete('/profile', authenticate, authorize(['user']), deleteProfile);


router.post('/revoke-token', authenticate, authorize(['user']), async (req, res, next) => {
  try {
    const token = req.body.token;
    await userService.revokeToken(req.user.id, token);
    res.json({ message: 'Token revoked successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;