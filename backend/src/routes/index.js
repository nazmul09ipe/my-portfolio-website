import { Router } from 'express';
import projectRoutes from './projectRoutes.js';
import messageRoutes from './messageRoutes.js';
import skillRoutes from './skillRoutes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Portfolio API is running' });
});

router.use('/projects', projectRoutes);
router.use('/messages', messageRoutes);
router.use('/skills', skillRoutes);

export default router;
