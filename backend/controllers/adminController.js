import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
//@description 获取所有用户信息
//@router GET /api/admin/users
//@access private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@description 删除用户
//@router DELETE /api/admin/user/:id
//@access private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: '用户成功删除' });
  } else {
    res.status(404);
    throw new Error('用户不存在');
  }
});

//@desc  get  user by id
//@route GET /api/admin/user/:id
//@access private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('该用户不存在');
  }
});

//@description 更新用户信息
//@router PUT /api/admin/user/:id
//@access private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatatedUser = await user.save();
    res.json({
      _id: updatatedUser._id,
      name: updatatedUser.name,
      email: updatatedUser.email,
      role: updatatedUser.role,
      image: updatatedUser.image,
    });
  } else {
    res.status(404);
    throw new Error('用户不存在');
  }
});
//@description 删除产品
//@router DELETE /api/admin/product/:id
//@access public admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'product Removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
//@description 新建产品
//@router POST /api/admin/products
//@access public admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: '实例 名字',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: '实例 品牌',
    category: '实例 分类',
    countInStock: 0,
    nomReviews: 0,
    description: '实例 描述',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
//@description 更新产品信息
//@router PUT /api/admin/product/:id
//@access private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('prodcut not found');
  }
});
//@desc  get  product by id
//@route GET /api/admin/product/:id
//@access private/admin
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('该商品不存在');
  }
});
//@description 管理员获取所有订单的信息
//@router GET /api/admin/orders
//@access private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name image');
  res.json(orders);
});
//@description update order to delivered
//@router GET /api/order/:id/deliver
//@access private/ADMIN
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('order not found');
  }
});
export {
  getUsers,
  deleteUser,
  getUserById,
  getProductById,
  updateUser,
  deleteProduct,
  createProduct,
  updateProduct,
  getOrders,
  updateOrderToDelivered,
};
