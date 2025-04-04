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


