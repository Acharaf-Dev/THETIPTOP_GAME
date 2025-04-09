<<<<<<< HEAD
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connexion à la base de données réussi");
    } catch (error) {
        console.log(error, "Echec de la connexion à la base de données");
    }
}

module.exports = connectDB;


=======
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    const uri = process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URI_TEST
      : process.env.MONGO_URI;

    console.log("📡 URI utilisée :", uri);

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connexion MongoDB réussie !');
  } catch (err) {
    console.error('❌ Erreur MongoDB :', err.message);
    if (process.env.NODE_ENV === 'test') throw err;
    process.exit(1);
  }
};

module.exports = connectDB;
>>>>>>> df0fa71cbf65b7a5e01c74aa12342c91324b0345
