import dotenv from 'dotenv';
import connectDB from '../src/config/database.js';
import AdminUser from '../src/models/AdminUser.js';

dotenv.config();

const createSuperAdmin = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Check if super admin already exists
    const existingSuperAdmin = await AdminUser.findOne({ role: 'super_admin' });
    
    if (existingSuperAdmin) {
      console.log('⚠️  Super admin already exists');
      console.log(`Username: ${existingSuperAdmin.username}`);
      console.log(`Email: ${existingSuperAdmin.email}`);
      process.exit(0);
    }

    // Create super admin
    const superAdminData = {
      username: 'superadmin',
      email: 'admin@thebrunchtraiteur.com',
      password: 'SuperAdmin123!',
      name: 'Super Administrator',
      role: 'super_admin'
    };

    const superAdmin = new AdminUser(superAdminData);
    await superAdmin.save();

    console.log('🎉 Super admin created successfully!');
    console.log('📧 Email:', superAdminData.email);
    console.log('👤 Username:', superAdminData.username);
    console.log('🔐 Password:', superAdminData.password);
    console.log('');
    console.log('⚠️  IMPORTANT: Change the default password after first login!');
    console.log('');
    console.log('🔗 You can now login at: http://localhost:3000/api/auth/login');

  } catch (error) {
    console.error('❌ Error creating super admin:', error.message);
    
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      console.log(`⚠️  ${duplicateField} already exists: ${error.keyValue[duplicateField]}`);
    }
  } finally {
    process.exit(0);
  }
};

createSuperAdmin();