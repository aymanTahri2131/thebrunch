import express from 'express';
import {
  getBrunchMenu,
  getAdminBrunchMenu,
  updateBrunchMenu,
  createBrunchMenuItem,
  addBrunchProduct,
  updateBrunchProduct,
  deleteBrunchProduct,
  addBrunchCategory,
  updateBrunchCategory,
  deleteBrunchCategory
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

// Ajout d'une catégorie
router.post('/admin/category', addBrunchCategory);

// Modification d'une catégorie
router.put('/admin/category/:categoryId', updateBrunchCategory);

// Suppression d'une catégorie
router.delete('/admin/category/:categoryId', deleteBrunchCategory);

export default router;
