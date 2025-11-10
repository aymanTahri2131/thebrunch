import express from 'express';
import {
  login,
  getProfile,
  changePassword,
  logout,
  createAdmin,
  getAdminUsers
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes
router.use(authMiddleware);
router.get('/profile', getProfile);
router.put('/change-password', changePassword);
router.post('/logout', logout);

// Super admin only routes
router.post('/admin/create', createAdmin);
router.get('/admin/users', getAdminUsers);

export default router;