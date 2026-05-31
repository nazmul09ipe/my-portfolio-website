import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { verifyFirebaseToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', verifyFirebaseToken, createProject);
router.patch('/:id', verifyFirebaseToken, updateProject);
router.delete('/:id', verifyFirebaseToken, deleteProject);

export default router;
