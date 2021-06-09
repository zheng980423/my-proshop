import express from 'express';

import {
  getProducts,
  getProductById,
  createProductReview,
  getTopProducts,
  getRelatedProductById,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getProducts);
router.route('/top').get(getTopProducts);
router.route('/:id').get(getProductById);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id/related').get(getRelatedProductById);

export default router;
