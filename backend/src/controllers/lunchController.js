import LunchMenu from '../models/LunchMenu.js';
import { body, validationResult } from 'express-validator';

// @desc    Get active lunch menu
// @route   GET /api/lunch
// @access  Public
export const getLunchMenu = async (req, res) => {
  try {
    const lunchMenu = await LunchMenu.getActiveMenu();
    if (!lunchMenu) {
      return res.status(404).json({ success: false, message: 'No active lunch menu found' });
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
    res.status(500).json({ success: false, message: 'Server error while fetching lunch menu' });
  }
};

// @desc    Get lunch menu for admin (includes inactive items)
// @route   GET /api/lunch/admin
// @access  Private (Admin)
export const getAdminLunchMenu = async (req, res) => {
  try {
    const lunchMenu = await LunchMenu.findOne().sort({ updatedAt: -1 });
    if (!lunchMenu) {
      const defaultMenu = new LunchMenu({ categories: [] });
      await defaultMenu.save();
      return res.status(200).json({ success: true, data: defaultMenu });
    }
    res.status(200).json({ success: true, data: lunchMenu });
  } catch (error) {
    console.error('Error fetching admin lunch menu:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching admin lunch menu' });
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
      if (!lunchMenu) lunchMenu = new LunchMenu();

      // ===== DELETE PRODUCT =====
      if (action === 'deleteProduct' && categoryId && productId) {
        const category = lunchMenu.categories.find(cat => cat.id === categoryId);
        if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

        const productIndex = category.products.findIndex(p => p._id?.toString() === productId || p.id === productId);
        if (productIndex === -1) return res.status(404).json({ success: false, message: 'Product not found' });

        category.products.splice(productIndex, 1);
        lunchMenu.lastUpdated = new Date();
        await lunchMenu.save();

        return res.status(200).json({ success: true, message: 'Product deleted successfully', data: lunchMenu });
      }

      // ===== UPDATE PRODUCT =====
      if (action === 'updateProduct' && categoryId && req.body.itemId) {
        const category = lunchMenu.categories.find(cat => cat.id === categoryId);
        if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

        const productIndex = category.products.findIndex(p => p._id?.toString() === req.body.itemId || p.id === req.body.itemId);
        if (productIndex === -1) return res.status(404).json({ success: false, message: 'Product not found' });

        const updates = req.body.updates;

        // تنظيف السعر بدون مسح الأورو
        if (updates.price !== undefined) {
          let newPrice = updates.price;
          if (typeof newPrice === 'string') newPrice = newPrice.replace(/\s/g, '').replace(',', '.');
          newPrice = parseFloat(newPrice);
          if (isNaN(newPrice) || newPrice <= 0) return res.status(400).json({ success: false, message: 'Le prix doit être un nombre positif valide' });
          if (newPrice > 1000) return res.status(400).json({ success: false, message: 'Le prix ne peut pas dépasser 1000€' });
          updates.price = newPrice;
        }

        Object.keys(updates).forEach(key => {
          if (updates[key] !== undefined) category.products[productIndex][key] = updates[key];
        });

        lunchMenu.lastUpdated = new Date();
        await lunchMenu.save();

        return res.status(200).json({ success: true, message: 'Product updated successfully', data: lunchMenu });
      }

      // ===== ADD PRODUCT =====
      if (action === 'addProduct' && categoryId && req.body.productData) {
        const category = lunchMenu.categories.find(cat => cat.id === categoryId);
        if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

        const { name, description, price, quantity, items, lastItem, isActive } = req.body.productData;

        if (!name || !description || !price) {
          return res.status(400).json({ success: false, message: 'Name, description and price are required' });
        }

        let cleanPrice = price;
        if (typeof cleanPrice === 'string') cleanPrice = cleanPrice.replace(/\s/g, '').replace(',', '.');
        cleanPrice = parseFloat(cleanPrice);
        if (isNaN(cleanPrice) || cleanPrice <= 0) return res.status(400).json({ success: false, message: 'Invalid price' });
        if (cleanPrice > 1000) return res.status(400).json({ success: false, message: 'Price cannot exceed 1000€' });

        const existingProduct = category.products.find(p => p.name.toLowerCase().trim() === name.toLowerCase().trim());
        if (existingProduct) return res.status(400).json({ success: false, message: 'Product with this name already exists' });

        const newProduct = {
          id: Date.now().toString(),
          name: name.trim(),
          description: description.trim(),
          price: cleanPrice,
          quantity: quantity?.trim() || '',
          items: items || [],
          lastItem: lastItem?.trim() || '',
          isActive: isActive !== undefined ? isActive : true
        };

        if (!category.products) category.products = [];
        category.products.push(newProduct);

        lunchMenu.lastUpdated = new Date();
        await lunchMenu.save();

        return res.status(201).json({ success: true, message: 'Product added successfully', data: lunchMenu });
      }

      // ===== FULL MENU UPDATE =====
      if (categories) {
        lunchMenu.categories = categories;
        lunchMenu.lastUpdated = new Date();
        await lunchMenu.save();
        return res.status(200).json({ success: true, message: 'Lunch menu updated successfully', data: lunchMenu });
      }

      return res.status(400).json({ success: false, message: 'Invalid request. Please provide action or categories.' });

    } catch (error) {
      console.error('Error updating lunch menu:', error);
      res.status(500).json({ success: false, message: 'Server error while updating lunch menu' });
    }
  }
];

// ===== ADD CATEGORY =====
export const addLunchCategory = [
  body('id').notEmpty().withMessage('Category ID is required'),
  body('name').notEmpty().withMessage('Category name is required'),
  body('icon').notEmpty().withMessage('Category icon is required'),
  body('description').notEmpty().withMessage('Category description is required'),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

      let lunchMenu = await LunchMenu.findOne().sort({ updatedAt: -1 });
      if (!lunchMenu) lunchMenu = new LunchMenu({ categories: [] });

      const existingCategory = lunchMenu.categories.find(cat => cat.id === req.body.id);
      if (existingCategory) return res.status(400).json({ success: false, message: 'Category with this ID already exists' });

      lunchMenu.categories.push({ ...req.body, products: [] });
      lunchMenu.lastUpdated = new Date();
      await lunchMenu.save();

      res.status(201).json({ success: true, message: 'Category added successfully', data: lunchMenu });
    } catch (error) {
      console.error('Error adding lunch category:', error);
      res.status(500).json({ success: false, message: 'Server error while adding category' });
    }
  }
];

// ===== DELETE CATEGORY =====
export const deleteLunchCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    let lunchMenu = await LunchMenu.findOne().sort({ updatedAt: -1 });
    if (!lunchMenu) return res.status(404).json({ success: false, message: 'Lunch menu not found' });

    const categoryIndex = lunchMenu.categories.findIndex(cat => cat.id === categoryId);
    if (categoryIndex === -1) return res.status(404).json({ success: false, message: 'Category not found' });

    lunchMenu.categories.splice(categoryIndex, 1);
    lunchMenu.lastUpdated = new Date();
    await lunchMenu.save();

    res.status(200).json({ success: true, message: 'Category deleted successfully', data: lunchMenu });
  } catch (error) {
    console.error('Error deleting lunch category:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting category' });
  }
};
