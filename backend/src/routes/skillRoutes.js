import { Router } from 'express';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skillController.js';
import { verifyFirebaseToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getSkills);
router.post('/', verifyFirebaseToken, createSkill);
router.patch('/:id', verifyFirebaseToken, updateSkill);
router.delete('/:id', verifyFirebaseToken, deleteSkill);

export default router;
