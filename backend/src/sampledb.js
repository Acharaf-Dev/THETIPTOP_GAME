const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    const uri =
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TEST || 'mongodb://root:password@mongo-test-container:27017/tip_top_game_test?authSource=admin'
        : process.env.MONGO_URI || 'mongodb://localhost:27017/tip_top_game';

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connecté avec succès !');
  } catch (err) {
    console.error('❌ Erreur de connexion à MongoDB :', err.message);
    if (process.env.NODE_ENV === 'test') throw err;
    process.exit(1);
  }
};

module.exports = connectDB;
