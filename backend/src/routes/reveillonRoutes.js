import express from 'express';
import {
  getReveillonMenu,
  getAdminReveillonMenu,
  updateReveillonMenu,
  addReveillonPlateau,
  updateReveillonPlateau,
  deleteReveillonPlateau,
  toggleReveillonSeason
} from '../controllers/reveillonController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getReveillonMenu);

// Protected admin routes
router.use('/admin', authMiddleware);
router.get('/admin', getAdminReveillonMenu);
router.put('/admin', updateReveillonMenu);
router.post('/admin/plateau', addReveillonPlateau);
router.put('/admin/plateau/:plateauId', updateReveillonPlateau);
router.delete('/admin/plateau/:plateauId', deleteReveillonPlateau);
router.patch('/admin/season', toggleReveillonSeason);

export default router;