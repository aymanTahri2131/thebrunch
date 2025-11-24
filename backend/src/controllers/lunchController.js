import LunchMenu from '../models/LunchMenu.js';
import { body, validationResult } from 'express-validator';

// @desc    Get active lunch menu
// @route   GET /api/lunch
// @access  Public
export const getLunchMenu = async (req, res) => {
  try {
    const lunchMenu = await LunchMenu.getActiveMenu();
    
    if (!lunchMenu) {
      return res.status(404).json({
        success: false,
        message: 'No active lunch menu found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        categories: lunchMenu.activeCategories,
        lastUpdated: lunchMenu.lastUpdated
      }
    });
  } catch (error) {
    console.error('Error fetching lunch menu:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching lunch menu'
    });
  }
};

// @desc    Get lunch menu for admin (includes inactive items)
// @route   GET /api/lunch/admin
// @access  Private (Admin)
export const getAdminLunchMenu = async (req, res) => {
  try {
    const lunchMenu = await LunchMenu.findOne().sort({ updatedAt: -1 });
    
    if (!lunchMenu) {
      // Create default lunch menu structure
      const defaultMenu = new LunchMenu({
        categories: []
      });
      await defaultMenu.save();
      
      return res.status(200).json({
        success: true,
        data: defaultMenu
      });
    }

    res.status(200).json({
      success: true,
      data: lunchMenu
    });
  } catch (error) {
    console.error('Error fetching admin lunch menu:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching admin lunch menu'
    });
  }
};

// @desc    Update entire lunch menu or perform specific actions
// @route   PUT /api/lunch/admin
// @access  Private (Admin)
export const updateLunchMenu = [
  async (req, res) => {
    try {
      const { action, categoryId, productId, categories } = req.body;
      
      let lunchMenu = await LunchMenu.findOne().sort({ updatedAt: -1 });
      
      if (!lunchMenu) {
        lunchMenu = new LunchMenu();
      }

      // Handle specific actions
      if (action === 'deleteProduct' && categoryId && productId) {
        const category = lunchMenu.categories.find(cat => cat.id === categoryId);
        if (!category) {
          return res.status(404).json({
            success: false,
            message: 'Category not found'
          });
        }

        // Find and remove the product
        const productIndex = category.products.findIndex(product => 
          product._id.toString() === productId || product.id === productId
        );
        
        if (productIndex === -1) {
          return res.status(404).json({
            success: false,
            message: 'Product not found'
          });
        }

        category.products.splice(productIndex, 1);
        lunchMenu.lastUpdated = new Date();
        
        await lunchMenu.save();
        
        return res.status(200).json({
          success: true,
          message: 'Product deleted successfully',
          data: lunchMenu
        });
      }

      // Handle product update
      if (action === 'updateProduct' && categoryId && req.body.itemId) {
        const category = lunchMenu.categories.find(cat => cat.id === categoryId);
        if (!category) {
          return res.status(404).json({
            success: false,
            message: 'Category not found'
          });
        }

        // Find the product to update
        const productIndex = category.products.findIndex(product => 
          product._id.toString() === req.body.itemId || product.id === req.body.itemId
        );
        
        if (productIndex === -1) {
          return res.status(404).json({
            success: false,
            message: 'Product not found'
          });
        }

        // Update the product with new data
        const updates = req.body.updates;
        Object.keys(updates).forEach(key => {
          if (updates[key] !== undefined) {
            category.products[productIndex][key] = updates[key];
          }
        });

        lunchMenu.lastUpdated = new Date();
        await lunchMenu.save();
        
        return res.status(200).json({
          success: true,
          message: 'Product updated successfully',
          data: lunchMenu
        });
      }

      // Handle product addition
      if (action === 'addProduct' && categoryId && req.body.productData) {
        const category = lunchMenu.categories.find(cat => cat.id === categoryId);
        if (!category) {
          return res.status(404).json({
            success: false,
            message: 'Category not found'
          });
        }

        // Create new product with generated ID
        const newProduct = {
          id: Date.now().toString(),
          name: req.body.productData.name || '',
          description: req.body.productData.description || '',
          price: req.body.productData.price || '',
          items: req.body.productData.items || [],
          lastItem: req.body.productData.lastItem || '',
          isActive: req.body.productData.isActive !== undefined ? req.body.productData.isActive : true
        };

        // Add product to category
        if (!category.products) {
          category.products = [];
        }
        category.products.push(newProduct);

        lunchMenu.lastUpdated = new Date();
        await lunchMenu.save();
        
        return res.status(200).json({
          success: true,
          message: 'Product added successfully',
          data: lunchMenu
        });
      }

      // Handle plateau update
      if (action === 'updatePlateau' && categoryId && req.body.itemId) {
        const category = lunchMenu.categories.find(cat => cat.id === categoryId);
        if (!category) {
          return res.status(404).json({
            success: false,
            message: 'Category not found'
          });
        }

        // Find the plateau to update
        const plateauIndex = category.plateaux?.findIndex(plateau => 
          plateau._id.toString() === req.body.itemId || plateau.id === req.body.itemId
        );
        
        if (plateauIndex === -1 || !category.plateaux) {
          return res.status(404).json({
            success: false,
            message: 'Plateau not found'
          });
        }

        // Update the plateau with new data
        const updates = req.body.updates;
        Object.keys(updates).forEach(key => {
          if (updates[key] !== undefined) {
            category.plateaux[plateauIndex][key] = updates[key];
          }
        });

        lunchMenu.lastUpdated = new Date();
        await lunchMenu.save();
        
        return res.status(200).json({
          success: true,
          message: 'Plateau updated successfully',
          data: lunchMenu
        });
      }

      // Handle full menu update
      if (categories) {
        lunchMenu.categories = categories;
        lunchMenu.lastUpdated = new Date();
        
        await lunchMenu.save();
        
        return res.status(200).json({
          success: true,
          message: 'Lunch menu updated successfully',
          data: lunchMenu
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Invalid request. Please provide action or categories.'
      });

    } catch (error) {
      console.error('Error updating lunch menu:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while updating lunch menu'
      });
    }
  }
];

// @desc    Add new category to lunch menu
// @route   POST /api/lunch/admin/category
// @access  Private (Admin)
export const addLunchCategory = [
  body('id').notEmpty().withMessage('Category ID is required'),
  body('name').notEmpty().withMessage('Category name is required'),
  body('icon').notEmpty().withMessage('Category icon is required'),
  body('description').notEmpty().withMessage('Category description is required'),
  
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      let lunchMenu = await LunchMenu.findOne().sort({ updatedAt: -1 });
      
      if (!lunchMenu) {
        lunchMenu = new LunchMenu({ categories: [] });
      }
      
      // Check if category ID already exists
      const existingCategory = lunchMenu.categories.find(cat => cat.id === req.body.id);
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'Category with this ID already exists'
        });
      }
      
      lunchMenu.categories.push({
        ...req.body,
        products: []
      });
      
      lunchMenu.lastUpdated = new Date();
      await lunchMenu.save();
      
      res.status(201).json({
        success: true,
        message: 'Category added successfully',
        data: lunchMenu
      });
    } catch (error) {
      console.error('Error adding lunch category:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while adding category'
      });
    }
  }
];

// @desc    Delete category from lunch menu
// @route   DELETE /api/lunch/admin/category/:categoryId
// @access  Private (Admin)
export const deleteLunchCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    let lunchMenu = await LunchMenu.findOne().sort({ updatedAt: -1 });
    
    if (!lunchMenu) {
      return res.status(404).json({
        success: false,
        message: 'Lunch menu not found'
      });
    }
    
    const categoryIndex = lunchMenu.categories.findIndex(cat => cat.id === categoryId);
    
    if (categoryIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    lunchMenu.categories.splice(categoryIndex, 1);
    lunchMenu.lastUpdated = new Date();
    await lunchMenu.save();
    
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
      data: lunchMenu
    });
  } catch (error) {
    console.error('Error deleting lunch category:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting category'
    });
  }
};

// @desc    Create new product/plateau for lunch menu
// @route   POST /api/lunch/admin
// @access  Private (Admin)
export const createLunchMenuItem = async (req, res) => {
  try {
    const { action, categoryId, productData } = req.body;
    
    // Validation de base des données
    if (!action || !productData) {
      return res.status(400).json({
        success: false,
        message: 'Action et données du produit sont obligatoires'
      });
    }

    // Validation des champs obligatoires
    const requiredFields = ['name', 'description', 'price'];
    const missingFields = requiredFields.filter(field => 
      !productData[field] || 
      (typeof productData[field] === 'string' && productData[field].trim().length === 0)
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Champs obligatoires manquants: ${missingFields.join(', ')}`
      });
    }

    // Validation et nettoyage du prix
    let cleanPrice = productData.price;
    if (typeof cleanPrice === 'string') {
      cleanPrice = cleanPrice.replace(/[^\d.,]/g, '').replace(',', '.');
    }
    cleanPrice = parseFloat(cleanPrice);
    
    if (isNaN(cleanPrice) || cleanPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Le prix doit être un nombre positif valide'
      });
    }

    if (cleanPrice > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Le prix ne peut pas dépasser 1000€'
      });
    }
    
    let lunchMenu = await LunchMenu.findOne().sort({ updatedAt: -1 });
    
    if (!lunchMenu) {
      lunchMenu = new LunchMenu({ categories: [] });
      await lunchMenu.save();
    }

    // Handle product creation
    if (action === 'addProduct' && categoryId) {
      const category = lunchMenu.categories.find(cat => cat.id === categoryId);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Catégorie non trouvée'
        });
      }

      // Vérifier si un produit avec le même nom existe déjà
      const existingProduct = category.products.find(
        product => product.name.toLowerCase().trim() === productData.name.toLowerCase().trim()
      );
      
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: 'Un produit avec ce nom existe déjà dans cette catégorie'
        });
      }

      // Create new product with generated ID and cleaned data
      const newProduct = {
        id: Date.now().toString(),
        name: productData.name.trim(),
        description: productData.description.trim(),
        price: cleanPrice,
        quantity: productData.quantity ? productData.quantity.trim() : '',
        items: productData.items || [],
        lastItem: productData.lastItem ? productData.lastItem.trim() : '',
        isActive: productData.isActive !== undefined ? productData.isActive : true
      };

      // Add product to category
      if (!category.products) {
        category.products = [];
      }
      category.products.push(newProduct);

      lunchMenu.lastUpdated = new Date();
      await lunchMenu.save();
      
      return res.status(201).json({
        success: true,
        message: 'Produit ajouté avec succès',
        data: lunchMenu
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Requête invalide. Veuillez fournir une action et des données valides.'
    });

  } catch (error) {
    console.error('Error creating lunch menu item:', error);
    
    // Gestion spécifique des erreurs de validation Mongoose
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: `Erreurs de validation: ${validationErrors.join(', ')}`
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création du produit'
    });
  }
};
