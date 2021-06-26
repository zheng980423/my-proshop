import asyncHandler from 'express-async-handler';
import Conversation from '../models/conversationModel.js';

//@description 新建对话
//@router GET /api/conversation
//@access private
const createConversation = asyncHandler(async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user
//@description 获取已登录用户的订单信息
//@router GET /api/conversation/:userId
//@access private
const getConversationOfUser = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId
//@description 获取已登录用户的订单信息
//@router GET /api/orders/myorders
//@access private
const getConversationOfTwoUserId = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

export {
  createConversation,
  getConversationOfUser,
  getConversationOfTwoUserId,
};
