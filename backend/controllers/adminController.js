import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

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

export { getUsers, deleteUser, getUserById, updateUser, deleteProduct };
