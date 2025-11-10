import ReveillonMenu from '../models/ReveillonMenu.js';
import { body, validationResult } from 'express-validator';

// @desc    Get active reveillon menu
// @route   GET /api/reveillon
// @access  Public
export const getReveillonMenu = async (req, res) => {
  try {
    const reveillonMenu = await ReveillonMenu.getActiveMenu();
    
    if (!reveillonMenu) {
      return res.status(404).json({
        success: false,
        message: 'No active reveillon menu found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        plateaux: reveillonMenu.activePlateaux,
        lastUpdated: reveillonMenu.lastUpdated,
        isSeasonallyActive: reveillonMenu.isSeasonallyActive
      }
    });
  } catch (error) {
    console.error('Error fetching reveillon menu:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching reveillon menu'
    });
  }
};

// @desc    Get reveillon menu for admin
// @route   GET /api/reveillon/admin
// @access  Private (Admin)
export const getAdminReveillonMenu = async (req, res) => {
  try {
    const reveillonMenu = await ReveillonMenu.findOne().sort({ updatedAt: -1 });
    
    if (!reveillonMenu) {
      const defaultMenu = new ReveillonMenu({
        plateaux: [],
        seasonStartDate: new Date('2024-12-01'),
        seasonEndDate: new Date('2025-01-15')
      });
      await defaultMenu.save();
      
      return res.status(200).json({
        success: true,
        data: defaultMenu
      });
    }

    res.status(200).json({
      success: true,
      data: reveillonMenu
    });
  } catch (error) {
    console.error('Error fetching admin reveillon menu:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching admin reveillon menu'
    });
  }
};

// @desc    Update entire reveillon menu or perform specific actions
// @route   PUT /api/reveillon/admin
// @access  Private (Admin)
export const updateReveillonMenu = [
  async (req, res) => {
    try {
      const { action, categoryId, productId, plateaux, seasonStartDate, seasonEndDate } = req.body;
      
      let reveillonMenu = await ReveillonMenu.findOne().sort({ updatedAt: -1 });
      
      if (!reveillonMenu) {
        reveillonMenu = new ReveillonMenu();
      }

      // Handle specific actions
      if (action === 'deleteProduct' && productId) {
        // Find and remove the plateau
        const plateauIndex = reveillonMenu.plateaux.findIndex(plateau => 
          plateau._id.toString() === productId || plateau.id === productId
        );
        
        if (plateauIndex === -1) {
          return res.status(404).json({
            success: false,
            message: 'Plateau not found'
          });
        }

        reveillonMenu.plateaux.splice(plateauIndex, 1);
        reveillonMenu.lastUpdated = new Date();
        
        await reveillonMenu.save();
        
        return res.status(200).json({
          success: true,
          message: 'Plateau deleted successfully',
          data: reveillonMenu
        });
      }

      // Handle plateau update for reveillon (using updateProduct action for consistency)
      if (action === 'updateProduct' && req.body.itemId) {
        // Find the plateau to update
        const plateauIndex = reveillonMenu.plateaux.findIndex(plateau => 
          plateau._id.toString() === req.body.itemId || plateau.id === req.body.itemId
        );
        
        if (plateauIndex === -1) {
          return res.status(404).json({
            success: false,
            message: 'Plateau not found'
          });
        }

        // Update the plateau with new data
        const updates = req.body.updates;
        Object.keys(updates).forEach(key => {
          if (updates[key] !== undefined) {
            reveillonMenu.plateaux[plateauIndex][key] = updates[key];
          }
        });

        reveillonMenu.lastUpdated = new Date();
        await reveillonMenu.save();
        
        return res.status(200).json({
          success: true,
          message: 'Plateau updated successfully',
          data: reveillonMenu
        });
      }

      // Handle full menu update
      if (plateaux) {
        reveillonMenu.plateaux = plateaux;
        reveillonMenu.lastUpdated = new Date();
        
        if (seasonStartDate) reveillonMenu.seasonStartDate = new Date(seasonStartDate);
        if (seasonEndDate) reveillonMenu.seasonEndDate = new Date(seasonEndDate);
        
        await reveillonMenu.save();
        
        return res.status(200).json({
          success: true,
          message: 'Reveillon menu updated successfully',
          data: reveillonMenu
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Invalid request. Please provide action or plateaux.'
      });

    } catch (error) {
      console.error('Error updating reveillon menu:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while updating reveillon menu'
      });
    }
  }
];

// @desc    Add new plateau to reveillon menu
// @route   POST /api/reveillon/admin/plateau
// @access  Private (Admin)
export const addReveillonPlateau = [
  body('name').notEmpty().withMessage('Plateau name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('description').notEmpty().withMessage('Description is required'),
  body('items').isArray().withMessage('Items must be an array'),
  body('badgeText').optional().notEmpty().withMessage('Badge text cannot be empty'),
  body('badgeColor').optional().notEmpty().withMessage('Badge color cannot be empty'),
  
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      let reveillonMenu = await ReveillonMenu.findOne().sort({ updatedAt: -1 });
      
      if (!reveillonMenu) {
        reveillonMenu = new ReveillonMenu({ 
          plateaux: [],
          seasonStartDate: new Date('2024-12-01'),
          seasonEndDate: new Date('2025-01-15')
        });
      }
      
      reveillonMenu.plateaux.push(req.body);
      reveillonMenu.lastUpdated = new Date();
      
      await reveillonMenu.save();
      
      res.status(201).json({
        success: true,
        message: 'Plateau added successfully',
        data: reveillonMenu
      });
    } catch (error) {
      console.error('Error adding reveillon plateau:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while adding plateau'
      });
    }
  }
];

// @desc    Update plateau in reveillon menu
// @route   PUT /api/reveillon/admin/plateau/:plateauId
// @access  Private (Admin)
export const updateReveillonPlateau = [
  body('name').optional().notEmpty().withMessage('Plateau name cannot be empty'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('items').optional().isArray().withMessage('Items must be an array'),
  
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { plateauId } = req.params;
      
      let reveillonMenu = await ReveillonMenu.findOne().sort({ updatedAt: -1 });
      
      if (!reveillonMenu) {
        return res.status(404).json({
          success: false,
          message: 'Reveillon menu not found'
        });
      }
      
      const plateau = reveillonMenu.plateaux.id(plateauId);
      if (!plateau) {
        return res.status(404).json({
          success: false,
          message: 'Plateau not found'
        });
      }
      
      Object.assign(plateau, req.body);
      reveillonMenu.lastUpdated = new Date();
      
      await reveillonMenu.save();
      
      res.status(200).json({
        success: true,
        message: 'Plateau updated successfully',
        data: reveillonMenu
      });
    } catch (error) {
      console.error('Error updating reveillon plateau:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while updating plateau'
      });
    }
  }
];

// @desc    Delete plateau from reveillon menu
// @route   DELETE /api/reveillon/admin/plateau/:plateauId
// @access  Private (Admin)
export const deleteReveillonPlateau = async (req, res) => {
  try {
    const { plateauId } = req.params;
    
    let reveillonMenu = await ReveillonMenu.findOne().sort({ updatedAt: -1 });
    
    if (!reveillonMenu) {
      return res.status(404).json({
        success: false,
        message: 'Reveillon menu not found'
      });
    }
    
    const plateau = reveillonMenu.plateaux.id(plateauId);
    if (!plateau) {
      return res.status(404).json({
        success: false,
        message: 'Plateau not found'
      });
    }
    
    plateau.remove();
    reveillonMenu.lastUpdated = new Date();
    
    await reveillonMenu.save();
    
    res.status(200).json({
      success: true,
      message: 'Plateau deleted successfully',
      data: reveillonMenu
    });
  } catch (error) {
    console.error('Error deleting reveillon plateau:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting plateau'
    });
  }
};

// @desc    Toggle reveillon season status
// @route   PATCH /api/reveillon/admin/season
// @access  Private (Admin)
export const toggleReveillonSeason = [
  body('seasonStartDate').optional().isISO8601().withMessage('Invalid season start date'),
  body('seasonEndDate').optional().isISO8601().withMessage('Invalid season end date'),
  
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { seasonStartDate, seasonEndDate } = req.body;
      
      let reveillonMenu = await ReveillonMenu.findOne().sort({ updatedAt: -1 });
      
      if (!reveillonMenu) {
        return res.status(404).json({
          success: false,
          message: 'Reveillon menu not found'
        });
      }
      
      if (seasonStartDate) reveillonMenu.seasonStartDate = new Date(seasonStartDate);
      if (seasonEndDate) reveillonMenu.seasonEndDate = new Date(seasonEndDate);
      
      reveillonMenu.lastUpdated = new Date();
      
      await reveillonMenu.save();
      
      res.status(200).json({
        success: true,
        message: 'Season dates updated successfully',
        data: {
          seasonStartDate: reveillonMenu.seasonStartDate,
          seasonEndDate: reveillonMenu.seasonEndDate,
          isSeasonallyActive: reveillonMenu.isSeasonallyActive
        }
      });
    } catch (error) {
      console.error('Error updating reveillon season:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while updating season'
      });
    }
  }
];