// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try both possible environment variable names
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/eventora';
    
    if (!mongoURI || mongoURI === 'mongodb://localhost:27017/eventora') {
      console.warn('⚠️  Warning: Using default MongoDB URI. Set MONGO_URI in .env file for production.');
    }
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Test if we can access the Event model
    try {
      const Event = require('../models/Event');
      const count = await Event.countDocuments();
      console.log(`📋 Events in database: ${count}`);
    } catch (modelError) {
      console.warn('⚠️  Could not count events:', modelError.message);
    }
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
    });
    
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('💡 Make sure:');
    console.error('   1. MongoDB is running');
    console.error('   2. MONGO_URI is set in .env file');
    console.error('   3. Network access is allowed in MongoDB Atlas (if using cloud)');
    // Don't exit - let the server start and retry connection
    // The server can still handle requests and show proper error messages
  }
};

module.exports = connectDB;