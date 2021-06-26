import asyncHandler from 'express-async-handler';
import Message from '../models/messageModel.js';

//@description 新建消息
//@router POST /api/message
//@access private/admin
const addMessage = asyncHandler(async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//@description 获取会话中的所以消息
//@router GET /api/message/conversationId
//@access private/admin
const getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});
export { addMessage, getMessages };
