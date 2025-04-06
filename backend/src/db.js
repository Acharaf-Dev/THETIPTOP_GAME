const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const uri = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

    // Ferme la connexion existante si elle existe
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ MongoDB connecté avec succès !');
  } catch (err) {
    console.error('❌ Erreur de connexion à MongoDB :', err.message);
    if (process.env.NODE_ENV === 'test') throw err;
    process.exit(1);
  }
};

module.exports = connectDB;
