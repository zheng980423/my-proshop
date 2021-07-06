import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
//@description fetch all products
//@router Get /api/products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments();
  const allProducts = await Product.find({});
  const products = await Product.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ allProducts, products, page, pages: Math.ceil(count / pageSize) });
});
//@description fetch single product
//@router Get /api/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  const user = await User.findById(req.user._id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('您已经评价过了哦');
    }

    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      userId: user._id,
      user,
      role: user.role,
      image: user.image,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@description fetch single product
//@router Get /api/product/:id/related
//@access public
const getRelatedProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const category = await product.category;
  const relatedProduct = await Product.find({ category }).where({
    _id: { $ne: req.params.id },
  });
  if (product) {
    res.json(relatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    get  top rated Products
// @route   GET /api/products/top
// @access  public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(10);

  res.json(products);
});
export {
  getProducts,
  getProductById,
  createProductReview,
  getTopProducts,
  getRelatedProductById,
};
