import { Router } from 'express';
import {
  createMessage,
  getMessages,
  markMessageRead,
  deleteMessage,
} from '../controllers/messageController.js';
import { verifyFirebaseToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', createMessage);
router.get('/', verifyFirebaseToken, getMessages);
router.patch('/:id/read', verifyFirebaseToken, markMessageRead);
router.delete('/:id', verifyFirebaseToken, deleteMessage);

export default router;
