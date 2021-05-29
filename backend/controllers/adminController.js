import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

//@description 获取所有用户信息
//@router GET /api/admin/users
//@access private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
export { getUsers };
