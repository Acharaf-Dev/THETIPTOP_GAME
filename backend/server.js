require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./src/db');

const authRoutes = require('./src/routes/authRoute');
const userRoutes = require('./src/routes/userRoute');
const gameRoutes = require('./src/routes/gameRoute');
const contactRoutes = require('./src/routes/contactRoute');

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/game', gameRoutes);
app.use('/contact', contactRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur port ${PORT} derrière Traefik`);
  });
}

module.exports = app;
