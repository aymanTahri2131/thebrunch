import mongoose from 'mongoose';
import dotenv from 'dotenv';
import LunchMenu from '../src/models/LunchMenu.js';
import BrunchMenu from '../src/models/BrunchMenu.js';
import ReveillonMenu from '../src/models/ReveillonMenu.js';

// Charger les variables d'environnement
dotenv.config();

// URL de l'image par défaut
const DEFAULT_IMAGE_URL = 'https://res.cloudinary.com/doq0mdnkz/image/upload/v1762620556/thelunch/vk0fvpb6ssmevq7xgmwn.png';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

const updateLunchMenuImages = async () => {
  console.log('\n📝 Mise à jour des images du menu Lunch...');
  
  try {
    const lunchMenu = await LunchMenu.findOne();
    if (!lunchMenu) {
      console.log('❌ Aucun menu lunch trouvé');
      return;
    }

    let totalUpdated = 0;
    
    // Parcourir toutes les catégories
    for (const category of lunchMenu.categories) {
      // Mettre à jour les produits
      if (category.products && category.products.length > 0) {
        for (const product of category.products) {
          if (!product.image || product.image === '' || product.image.startsWith('/images/')) {
            product.image = DEFAULT_IMAGE_URL;
            totalUpdated++;
            console.log(`  ✓ Mis à jour: ${product.name}`);
          }
        }
      }
      
      // Mettre à jour les plateaux
      if (category.plateaux && category.plateaux.length > 0) {
        for (const plateau of category.plateaux) {
          if (!plateau.image || plateau.image === '' || plateau.image.startsWith('/images/')) {
            plateau.image = DEFAULT_IMAGE_URL;
            totalUpdated++;
            console.log(`  ✓ Mis à jour: ${plateau.name}`);
          }
        }
      }
    }

    // Sauvegarder les modifications
    if (totalUpdated > 0) {
      await lunchMenu.save();
      console.log(`✅ Menu Lunch: ${totalUpdated} images mises à jour`);
    } else {
      console.log('ℹ️ Menu Lunch: Aucune image à mettre à jour');
    }
    
    return totalUpdated;
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du menu lunch:', error);
    return 0;
  }
};

const updateBrunchMenuImages = async () => {
  console.log('\n🥐 Mise à jour des images du menu Brunch...');
  
  try {
    const brunchMenu = await BrunchMenu.findOne();
    if (!brunchMenu) {
      console.log('❌ Aucun menu brunch trouvé');
      return;
    }

    let totalUpdated = 0;
    
    // Parcourir toutes les catégories
    for (const category of brunchMenu.categories) {
      // Mettre à jour les produits
      if (category.products && category.products.length > 0) {
        for (const product of category.products) {
          if (!product.image || product.image === '' || product.image.startsWith('/images/')) {
            product.image = DEFAULT_IMAGE_URL;
            totalUpdated++;
            console.log(`  ✓ Mis à jour: ${product.name}`);
          }
        }
      }
      
      // Mettre à jour les plateaux
      if (category.plateaux && category.plateaux.length > 0) {
        for (const plateau of category.plateaux) {
          if (!plateau.image || plateau.image === '' || plateau.image.startsWith('/images/')) {
            plateau.image = DEFAULT_IMAGE_URL;
            totalUpdated++;
            console.log(`  ✓ Mis à jour: ${plateau.name}`);
          }
        }
      }
    }

    // Sauvegarder les modifications
    if (totalUpdated > 0) {
      await brunchMenu.save();
      console.log(`✅ Menu Brunch: ${totalUpdated} images mises à jour`);
    } else {
      console.log('ℹ️ Menu Brunch: Aucune image à mettre à jour');
    }
    
    return totalUpdated;
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du menu brunch:', error);
    return 0;
  }
};

const updateReveillonMenuImages = async () => {
  console.log('\n🎉 Mise à jour des images du menu Réveillon...');
  
  try {
    const reveillonMenu = await ReveillonMenu.findOne();
    if (!reveillonMenu) {
      console.log('❌ Aucun menu réveillon trouvé');
      return;
    }

    let totalUpdated = 0;
    
    // Mettre à jour les plateaux du réveillon
    if (reveillonMenu.plateaux && reveillonMenu.plateaux.length > 0) {
      for (const plateau of reveillonMenu.plateaux) {
        if (!plateau.image || plateau.image === '' || plateau.image.startsWith('/images/')) {
          plateau.image = DEFAULT_IMAGE_URL;
          totalUpdated++;
          console.log(`  ✓ Mis à jour: ${plateau.name}`);
        }
      }
    }

    // Sauvegarder les modifications
    if (totalUpdated > 0) {
      await reveillonMenu.save();
      console.log(`✅ Menu Réveillon: ${totalUpdated} images mises à jour`);
    } else {
      console.log('ℹ️ Menu Réveillon: Aucune image à mettre à jour');
    }
    
    return totalUpdated;
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du menu réveillon:', error);
    return 0;
  }
};

const updateDefaultImages = async () => {
  try {
    console.log('🚀 Début de la mise à jour des images par défaut...');
    console.log(`📷 Image par défaut: ${DEFAULT_IMAGE_URL}`);
    
    await connectDB();
    
    const lunchUpdated = await updateLunchMenuImages();
    const brunchUpdated = await updateBrunchMenuImages();
    const reveillonUpdated = await updateReveillonMenuImages();
    
    const totalUpdated = lunchUpdated + brunchUpdated + reveillonUpdated;
    
    console.log('\n📊 RÉSUMÉ:');
    console.log(`✅ Total d'images mises à jour: ${totalUpdated}`);
    console.log(`   - Lunch: ${lunchUpdated}`);
    console.log(`   - Brunch: ${brunchUpdated}`);
    console.log(`   - Réveillon: ${reveillonUpdated}`);
    
    if (totalUpdated > 0) {
      console.log('\n🎯 Toutes les images ont été mises à jour avec succès !');
      console.log('💡 Vous pouvez maintenant personnaliser les images via le dashboard admin.');
    } else {
      console.log('\n✨ Toutes les images étaient déjà à jour !');
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Déconnexion de MongoDB');
    process.exit(0);
  }
};

// Exécuter le script
updateDefaultImages();