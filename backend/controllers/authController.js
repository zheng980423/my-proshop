import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';
// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404);
    throw new Error('该用户未绑定邮箱');
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  // // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/auth/resetpassword/${resetToken}`;

  //frontend
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(404);
    throw new Error('邮箱发送失败');
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});
// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
const resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error('无效凭证');
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    image: user.image,
    token: generateToken(user._id),
  });
});

export { forgotPassword, resetPassword };
