import LunchMenu from '../models/LunchMenu.js';
import { body, validationResult } from 'express-validator';

// دالة لمساعدة تنسيق السعر مع €
const formatPrice = (price) => {
  let cleanPrice = price;
  if (typeof cleanPrice === 'string') {
    cleanPrice = cleanPrice.replace(/[€\s]/g, '').replace(',', '.');
  }
  cleanPrice = parseFloat(cleanPrice);
  if (isNaN(cleanPrice) || cleanPrice <= 0) return null;
  return cleanPrice.toFixed(2) + ' €';
};

// @desc Get active lunch menu
export const getLunchMenu = async (req, res) => {
  try {
    const lunchMenu = await LunchMenu.getActiveMenu();
    if (!lunchMenu) {
      return res.status(404).json({ success: false, message: 'No active lunch menu found' });
    }

    // تحويل جميع الأسعار للأورو
    const categories = lunchMenu.activeCategories.map(cat => ({
      ...cat,
      products: cat.products?.map(p => ({ ...p, price: formatPrice(p.price) })),
      plateaux: cat.plateaux?.map(p => ({ ...p, price: formatPrice(p.price) }))
    }));

    res.status(200).json({ success: true, data: { categories, lastUpdated: lunchMenu.lastUpdated } });
  } catch (error) {
    console.error('Error fetching lunch menu:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching lunch menu' });
  }
};

// @desc Admin lunch menu
export const getAdminLunchMenu = async (req, res) => {
  try {
    const lunchMenu = await LunchMenu.findOne().sort({ updatedAt: -1 });
    if (!lunchMenu) {
      const defaultMenu = new LunchMenu({ categories: [] });
      await defaultMenu.save();
      return res.status(200).json({ success: true, data: defaultMenu });
    }

    const categories = lunchMenu.categories.map(cat => ({
      ...cat,
      products: cat.products?.map(p => ({ ...p, price: formatPrice(p.price) })),
      plateaux: cat.plateaux?.map(p => ({ ...p, price: formatPrice(p.price) }))
    }));

    res.status(200).json({ success: true, data: { ...lunchMenu.toObject(), categories } });
  } catch (error) {
    console.error('Error fetching admin lunch menu:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching admin lunch menu' });
  }
};

// @desc Create new product
export const createLunchMenuItem = async (req, res) => {
  try {
    const { action, categoryId, productData } = req.body;

    if (!action || !productData) return res.status(400).json({ success: false, message: 'Action et données du produit sont obligatoires' });

    // Validation des champs
    const requiredFields = ['name', 'description', 'price'];
    const missingFields = requiredFields.filter(f => !productData[f] || (typeof productData[f] === 'string' && !productData[f].trim()));
    if (missingFields.length > 0) return res.status(400).json({ success: false, message: `Champs obligatoires manquants: ${missingFields.join(', ')}` });

    // Formatage du prix
    const formattedPrice = formatPrice(productData.price);
    if (!formattedPrice) return res.status(400).json({ success: false, message: 'Le prix doit être un nombre positif valide' });

    let lunchMenu = await LunchMenu.findOne().sort({ updatedAt: -1 });
    if (!lunchMenu) lunchMenu = new LunchMenu({ categories: [] });

    if (action === 'addProduct' && categoryId) {
      const category = lunchMenu.categories.find(cat => cat.id === categoryId);
      if (!category) return res.status(404).json({ success: false, message: 'Catégorie non trouvée' });

      const existingProduct = category.products.find(p => p.name.toLowerCase().trim() === productData.name.toLowerCase().trim());
      if (existingProduct) return res.status(400).json({ success: false, message: 'Un produit avec ce nom existe déjà dans cette catégorie' });

      const newProduct = {
        id: Date.now().toString(),
        name: productData.name.trim(),
        description: productData.description.trim(),
        price: formattedPrice,
        quantity: productData.quantity ? productData.quantity.trim() : '',
        items: productData.items || [],
        lastItem: productData.lastItem ? productData.lastItem.trim() : '',
        isActive: productData.isActive !== undefined ? productData.isActive : true
      };

      category.products.push(newProduct);
      lunchMenu.lastUpdated = new Date();
      await lunchMenu.save();

      return res.status(201).json({ success: true, message: 'Produit ajouté avec succès', data: lunchMenu });
    }

    return res.status(400).json({ success: false, message: 'Requête invalide. Veuillez fournir une action et des données valides.' });

  } catch (error) {
    console.error('Error creating lunch menu item:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur lors de la création du produit' });
  }
};
