import express from 'express';
const router = express.Router();
import { addMessage, getMessages } from '../controllers/messageController.js';

//add
router.post('/', addMessage);
//get
router.get('/:conversationId', getMessages);

export default router;
