const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const uri = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ MongoDB connecté avec succès !');
  } catch (err) {
    console.error('❌ Erreur de connexion à MongoDB :', err.message);

    if (process.env.NODE_ENV === 'test') {
      throw err;
    } else {
      process.exit(1);
    }
  }
};

// ✅ Fermeture propre de la connexion Mongo (utile pour Jest)
const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log('🛑 Connexion MongoDB fermée proprement');
};

module.exports = {
  connectDB,
  disconnectDB,
};
