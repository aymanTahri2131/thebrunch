import dotenv from 'dotenv';
import connectDB from '../src/config/database.js';
import LunchMenu from '../src/models/LunchMenu.js';
import BrunchMenu from '../src/models/BrunchMenu.js';
import ReveillonMenu from '../src/models/ReveillonMenu.js';
import { lunchData, brunchData, reveillonData } from './seedData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connexion à MongoDB
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Suppression des données existantes (pour forcer la re-migration)
    await LunchMenu.deleteMany({});
    await BrunchMenu.deleteMany({});
    await ReveillonMenu.deleteMany({});
    console.log('🗑️ Existing data cleared');

    console.log('🚀 Starting data migration...');

    // 1. Migration des données Lunch
    console.log('\n📊 Migrating Lunch Menu data...');
    
    const lunchMenu = new LunchMenu({
      categories: lunchData.categories,
      lastUpdated: new Date()
    });
    
    await lunchMenu.save();
    console.log('✅ Lunch menu created successfully');
    console.log(`   - ${lunchData.categories.length} categories`);
    console.log(`   - ${lunchData.categories.reduce((total, cat) => total + cat.products.length, 0)} products total`);

    // 2. Migration des données Brunch
    console.log('\n🥐 Migrating Brunch Menu data...');
    
    const brunchMenu = new BrunchMenu({
      categories: brunchData.categories,
      lastUpdated: new Date()
    });
    
    await brunchMenu.save();
    console.log('✅ Brunch menu created successfully');
    console.log(`   - ${brunchData.categories.length} categories`);
    console.log(`   - ${brunchData.categories.reduce((total, cat) => total + cat.products.length, 0)} products total`);

    // 3. Migration des données Réveillon
    console.log('\n🎉 Migrating Réveillon Menu data...');
    
    const reveillonMenu = new ReveillonMenu({
      plateaux: reveillonData.plateaux,
      seasonStartDate: reveillonData.seasonStartDate,
      seasonEndDate: reveillonData.seasonEndDate,
      lastUpdated: new Date()
    });
    
    await reveillonMenu.save();
    console.log('✅ Réveillon menu created successfully');
    console.log(`   - ${reveillonData.plateaux.length} plateaux`);
    console.log(`   - Season: ${reveillonData.seasonStartDate.toLocaleDateString()} to ${reveillonData.seasonEndDate.toLocaleDateString()}`);

    console.log('\n🎊 Data migration completed successfully!');
    console.log('\n📋 Summary:');
    console.log('   - Lunch Menu: Ready');
    console.log('   - Brunch Menu: Ready');
    console.log('   - Réveillon Menu: Ready');
    console.log('\n🔗 You can now test the API endpoints:');
    console.log('   - GET http://localhost:5000/api/lunch');
    console.log('   - GET http://localhost:5000/api/brunch');
    console.log('   - GET http://localhost:5000/api/reveillon');

  } catch (error) {
    console.error('❌ Error during data migration:', error.message);
    
    if (error.name === 'ValidationError') {
      console.log('\n🔍 Validation errors:');
      Object.keys(error.errors).forEach(key => {
        console.log(`   - ${key}: ${error.errors[key].message}`);
      });
    }
  } finally {
    console.log('\n👋 Migration script finished');
    process.exit(0);
  }
};

// Options de ligne de commande
const args = process.argv.slice(2);
const forceReset = args.includes('--reset');

if (forceReset) {
  console.log('⚠️ FORCE RESET MODE: All existing data will be deleted!');
  // Décommenter les lignes de suppression ci-dessus si vous voulez cette fonctionnalité
}

seedDatabase();