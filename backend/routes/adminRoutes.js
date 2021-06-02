import express from 'express';

import {
  createProduct,
  deleteProduct,
  deleteUser,
  getProductById,
  getUserById,
  getUsers,
  updateProduct,
  updateUser,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/users').get(protect, admin, getUsers);
router
  .route('/user/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
router
  .route('/product/:id')
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
  .get(protect, admin, getProductById);
router.route('/products').post(protect, admin, createProduct);
router.route('/orders').get(protect, admin, getOrders);
router.route('/order/:id/deliver').put(protect, admin, updateOrderToDelivered);
export default router;
