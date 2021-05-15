import express from 'express';

import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';

//@description fetch all products
//@router Get /api/products
//@access public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
//@description fetch single product
//@router Get /api/products/:id
//@access public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);
export default router;
