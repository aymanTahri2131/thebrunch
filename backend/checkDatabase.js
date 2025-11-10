import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './src/config/database.js';
import ReveillonMenu from './src/models/ReveillonMenu.js';
import BrunchMenu from './src/models/BrunchMenu.js';
import LunchMenu from './src/models/LunchMenu.js';

dotenv.config();

async function checkDatabase() {
  try {
    await connectDB();
    console.log('✅ Connexion MongoDB établie\n');
    
    console.log('=== VÉRIFICATION MENU RÉVEILLON ===');
    const reveillonMenus = await ReveillonMenu.find({});
    console.log(`Nombre de documents trouvés: ${reveillonMenus.length}`);
    if (reveillonMenus.length > 0) {
      console.log('Plateaux trouvés:');
      reveillonMenus[0].plateaux.forEach((plateau, index) => {
        console.log(`  ${index + 1}. ${plateau.title} - ${plateau.price}`);
      });
    }
    
    console.log('\n=== VÉRIFICATION MENU BRUNCH ===');
    const brunchMenus = await BrunchMenu.find({});
    console.log(`Nombre de documents trouvés: ${brunchMenus.length}`);
    if (brunchMenus.length > 0) {
      console.log('Catégories trouvées:');
      brunchMenus[0].categories.forEach((category, index) => {
        console.log(`  ${index + 1}. ${category.name} - ${category.products.length} produits`);
        category.products.forEach((product, pIndex) => {
          console.log(`    - ${product.name} (${product.price})`);
        });
      });
    }
    
    console.log('\n=== VÉRIFICATION MENU LUNCH ===');
    const lunchMenus = await LunchMenu.find({});
    console.log(`Nombre de documents trouvés: ${lunchMenus.length}`);
    if (lunchMenus.length > 0) {
      console.log('Catégories trouvées:');
      lunchMenus[0].categories.forEach((category, index) => {
        console.log(`  ${index + 1}. ${category.name} - ${category.products.length} produits`);
        category.products.forEach((product, pIndex) => {
          console.log(`    - ${product.name} (${product.price})`);
        });
      });
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.connection.close();
  }
}

checkDatabase();