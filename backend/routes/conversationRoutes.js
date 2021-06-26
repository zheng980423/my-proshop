import express from 'express';
const router = express.Router();
import {
  createConversation,
  getConversationOfUser,
  getConversationOfTwoUserId,
} from '../controllers/conversationController.js';

//new conv
router.post('/', createConversation);

//get conv of a user
router.get('/:userId', getConversationOfUser);

// get conv includes two userId
router.get('/find/:firstUserId/:secondUserId', getConversationOfTwoUserId);

export default router;
