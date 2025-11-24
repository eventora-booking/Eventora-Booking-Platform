// Script to create admin user
// Run: node scripts/createAdmin.js

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const createAdmin = async () => {
  try {
    await connectDB();
    
    const adminEmail = 'gundeeparora66@gmail.com';
    const adminPassword = 'Agra@3293';
    
    // Delete existing user if exists (to start fresh)
    await User.deleteOne({ email: adminEmail });
    console.log('🗑️  Removed any existing user with this email');
    
    // Create new admin user (this ensures password is hashed correctly)
    const admin = await User.create({
      name: 'Admin User',
      email: adminEmail,
      password: adminPassword, // Will be hashed by pre-save hook
      role: 'admin',
      isVerified: true,
      provider: 'local',
      isActive: true
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('IsVerified:', admin.isVerified);
    console.log('Provider:', admin.provider);
    
    // Verify the password works
    const verifyUser = await User.findOne({ email: adminEmail }).select('+password');
    if (!verifyUser) {
      console.log('❌ Failed to find user after creation!');
      process.exit(1);
    }
    
    const isPasswordCorrect = await verifyUser.comparePassword(adminPassword);
    if (isPasswordCorrect) {
      console.log('✅ Password verification successful!');
    } else {
      console.log('❌ Password verification failed!');
      console.log('This might indicate an issue with password hashing.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();

