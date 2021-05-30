import express from 'express';

import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/users').get(protect, admin, getUsers);
router
  .route('/user/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
export default router;
