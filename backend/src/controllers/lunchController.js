import LunchMenu from '../models/LunchMenu.js';
import { body, validationResult } from 'express-validator';

// --- GET active menu ---
export const getLunchMenu = async (req, res) => {
  try {
    const lunchMenu = await LunchMenu.findOne().sort({ updatedAt: -1 });
    if (!lunchMenu) return res.status(404).json({ success: false, message: 'No menu found' });

    res.status(200).json({
      success: true,
      data: {
        categories: lunchMenu.categories,
        lastUpdated: lunchMenu.lastUpdated
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// --- ADD product ---
export const createLunchMenuItem = async (req, res) => {
  try {
    const { action, categoryId, productData } = req.body;

    if (!action || !productData) return res.status(400).json({ success: false, message: 'Action et données obligatoires' });

    const requiredFields = ['name', 'description', 'price'];
    const missingFields = requiredFields.filter(field => !productData[field] || (typeof productData[field] === 'string' && productData[field].trim() === ''));
    if (missingFields.length > 0) return res.status(400).json({ success: false, message: `Champs manquants: ${missingFields.join(', ')}` });

    let cleanPrice = parseFloat(productData.price.toString().replace(',', '.'));
    if (isNaN(cleanPrice) || cleanPrice <= 0) return res.status(400).json({ success: false, message: 'Prix invalide' });

    let lunchMenu = await LunchMenu.findOne().sort({ updatedAt: -1 });
    if (!lunchMenu) { lunchMenu = new LunchMenu({ categories: [] }); await lunchMenu.save(); }

    if (action === 'addProduct' && categoryId) {
      const category = lunchMenu.categories.find(cat => cat.id === categoryId);
      if (!category) return res.status(404).json({ success: false, message: 'Catégorie non trouvée' });

      const existingProduct = category.products.find(p => p.name.toLowerCase().trim() === productData.name.toLowerCase().trim());
      if (existingProduct) return res.status(400).json({ success: false, message: 'Produit existe déjà' });

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

      category.products.push(newProduct);
      lunchMenu.lastUpdated = new Date();
      await lunchMenu.save();

      return res.status(201).json({ success: true, message: 'Produit ajouté', data: lunchMenu });
    }

    res.status(400).json({ success: false, message: 'Requête invalide' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// --- DISPLAY price in frontend (React) ---
/*
{category.products.map(product => (
  <div key={product.id}>
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <p>Prix: {product.price.toFixed(2)} €</p>
  </div>
))}
*/
