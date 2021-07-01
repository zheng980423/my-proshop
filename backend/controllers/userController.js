import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

//@description 验证用户，获得凭证
//@router POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  //从body中获取数据
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('邮箱或密码错误');
  }
});

//@description 获取已登录的用户信息
//@router GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    });
  } else {
    res.status(404);
    throw new Error('用户不存在');
  }
});
//@description 获取已登录的用户信息
//@router GET /api/users/:userId
//@access private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) {
    res.json({
      _id: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
      gender: user.gender,
      location: user.location,
      biography: user.biography,
      image: user.image,
    });
  } else {
    res.status(404);
    throw new Error('用户不存在');
  }
});

//@description 更新用户信息
//@router PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.biography = req.body.biography || user.biography;
    user.location = req.body.location || user.location;
    user.gender = req.body.gender || user.gender;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatatedUser = await user.save();
    res.json({
      _id: updatatedUser._id,
      name: updatatedUser.name,
      email: updatatedUser.email,
      biography: updatatedUser.biography,
      gender: updatatedUser.gender,
      location: updatatedUser.location,
      image: updatatedUser.image,
    });
  } else {
    res.status(404);
    throw new Error('用户不存在');
  }
});
//@description 注册用户
//@router POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('啊偶，该用户已经存在了');
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('用户数据无效');
  }
});
export {
  authUser,
  getUserProfile,
  getUserById,
  registerUser,
  updateUserProfile,
};
