import express from 'express';
import {
  getBrunchMenu,
  getAdminBrunchMenu,
  updateBrunchMenu,
  createBrunchMenuItem,
  addBrunchProduct,
  updateBrunchProduct,
  deleteBrunchProduct
} from '../controllers/brunchController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getBrunchMenu);

// Protected admin routes
router.use('/admin', authMiddleware);
router.get('/admin', getAdminBrunchMenu);
router.post('/admin', createBrunchMenuItem);
router.put('/admin', updateBrunchMenu);
router.post('/admin/category/:categoryId/product', addBrunchProduct);
router.put('/admin/category/:categoryId/product/:productId', updateBrunchProduct);
router.delete('/admin/category/:categoryId/product/:productId', deleteBrunchProduct);

export default router;