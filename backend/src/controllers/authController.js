import AdminUser from '../models/AdminUser.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export const login = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { username, password } = req.body;
      
      // Check if user exists
      const admin = await AdminUser.findOne({ username }).select('+password +loginAttempts +lockUntil');
      
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
      
      // Check if account is locked
      if (admin.isLocked) {
        return res.status(423).json({
          success: false,
          message: 'Account temporarily locked due to too many failed login attempts'
        });
      }
      
      // Verify password
      const isMatch = await bcrypt.compare(password, admin.password);
      
      if (!isMatch) {
        // Handle failed login attempt
        await admin.incLoginAttempts();
        
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
      
      // Reset login attempts on successful login
      if (admin.loginAttempts > 0) {
        await admin.updateOne({
          $unset: { loginAttempts: 1, lockUntil: 1 }
        });
      }
      
      // Update last login
      admin.lastLogin = new Date();
      admin.isActive = true;
      await admin.save();
      
      // Generate JWT token
      const token = jwt.sign(
        { 
          id: admin._id,
          username: admin.username,
          role: admin.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          token,
          admin: {
            id: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role,
            lastLogin: admin.lastLogin
          }
        }
      });
      
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during login'
      });
    }
  }
];

// @desc    Get current admin profile
// @route   GET /api/auth/profile
// @access  Private (Admin)
export const getProfile = async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.user.id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
        createdAt: admin.createdAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
};

// @desc    Change admin password
// @route   PUT /api/auth/change-password
// @access  Private (Admin)
export const changePassword = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { currentPassword, newPassword } = req.body;
      
      // Get admin with password
      const admin = await AdminUser.findById(req.user.id).select('+password');
      
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: 'Admin not found'
        });
      }
      
      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, admin.password);
      
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }
      
      // Hash new password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Update password
      admin.password = hashedPassword;
      await admin.save();
      
      res.status(200).json({
        success: true,
        message: 'Password changed successfully'
      });
      
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while changing password'
      });
    }
  }
];

// @desc    Logout admin (invalidate token - client-side mostly)
// @route   POST /api/auth/logout
// @access  Private (Admin)
export const logout = async (req, res) => {
  try {
    // Update last logout time
    await AdminUser.findByIdAndUpdate(req.user.id, {
      lastLogout: new Date()
    });
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
};

// @desc    Create new admin user (Super Admin only)
// @route   POST /api/auth/admin/create
// @access  Private (Super Admin)
export const createAdmin = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('role').isIn(['admin', 'super_admin']).withMessage('Invalid role'),
  
  async (req, res) => {
    try {
      // Check if user is super admin
      if (req.user.role !== 'super_admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Super admin privileges required.'
        });
      }
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { username, email, password, role } = req.body;
      
      // Check if admin already exists
      const existingAdmin = await AdminUser.findOne({
        $or: [{ username }, { email }]
      });
      
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: 'Admin with this username or email already exists'
        });
      }
      
      // Create new admin
      const admin = new AdminUser({
        username,
        email,
        password, // Will be hashed by pre-save middleware
        role
      });
      
      await admin.save();
      
      res.status(201).json({
        success: true,
        message: 'Admin created successfully',
        data: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          createdAt: admin.createdAt
        }
      });
      
    } catch (error) {
      console.error('Create admin error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while creating admin'
      });
    }
  }
];

// @desc    Get all admin users (Super Admin only)
// @route   GET /api/auth/admin/users
// @access  Private (Super Admin)
export const getAdminUsers = async (req, res) => {
  try {
    // Check if user is super admin
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Super admin privileges required.'
      });
    }
    
    const admins = await AdminUser.find({}).select('-password -loginAttempts -lockUntil');
    
    res.status(200).json({
      success: true,
      data: admins
    });
    
  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching admin users'
    });
  }
};