// server.js
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    });
  });
}
