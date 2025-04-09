<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Récupérer le token
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No token provided' 
            });
        }

        //verify the token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => { 
            if (err) {
                return res.status(401).json({ 
                    success: false,
                    message: 'Unauthorized user',
                    error: err.message 
                });
            } 
            
            // Vérifier si l'utilisateur existe dans la base de données
            const user = await User.findById(decoded.userId).select('-password'); 
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            req.user = user; // Stocker l'utilisateur dans req.user
            next();
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Please provide a valid token',
            error: error.message
        });
    }
};

module.exports = { authMiddleware };
=======
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel"); 

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("📩 Token reçu dans authMiddleware :", token);
    console.log("🔍 Token décodé :", decoded);

    const allUsers = await User.find({}, "_id email");
    console.log("🧪 Tous les users en base :", allUsers);

    const user = await User.findById(decoded.userId).select("-password");
    console.log("👤 Utilisateur trouvé :", user);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
      error: error.message,
    });
  }
};

module.exports = { authMiddleware };
>>>>>>> df0fa71cbf65b7a5e01c74aa12342c91324b0345
