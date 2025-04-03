require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/authRoute');
const userRoutes = require('./src/routes/userRoute');
const gameRoutes = require('./src/routes/gameRoute');
const contactRoutes = require('./src/routes/contactRoute');

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

// Middleware de log
app.use((req, res, next) => {
  console.log(`📥 Incoming Request: ${req.method} ${req.path}`);
  next();
});

// Liste des origines autorisées (mettre à jour si besoin)
const allowedOrigins = [
  'http://localhost:4200',
  'http://frontend.game-main2.orb.local',
  'http://www.dsp5-archi-f24a-15m-g8.fr',
  'https://www.dsp5-archi-f24a-15m-g8.fr'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log(`❌ CORS refusé pour l’origine : ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/contact', contactRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur port ${PORT} derrière Traefik`);
  });
}

module.exports = app;
