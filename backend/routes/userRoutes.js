import express from 'express';

import {
  authUser,
  followUser,
  getUserById,
  getUserProfile,
  registerUser,
  unFollowUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', authUser);
router.get('/:userId', getUserById);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unFollowUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/').post(registerUser);

export default router;
