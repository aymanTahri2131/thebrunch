import express from 'express';
import {
  getLunchMenu,
  getAdminLunchMenu,
  updateLunchMenu,
  createLunchMenuItem,
  addLunchCategory,
  deleteLunchCategory
} from '../controllers/lunchController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getLunchMenu);

// Protected admin routes
router.use('/admin', authMiddleware);
router.get('/admin', getAdminLunchMenu);
router.post('/admin', createLunchMenuItem);
router.put('/admin', updateLunchMenu);
router.post('/admin/category', addLunchCategory);
router.delete('/admin/category/:categoryId', deleteLunchCategory);

export default router;