// app.js
require("dotenv").config();
const cors = require("cors");
const express = require("express");


const authRoutes = require("./src/routes/authRoute");
const userRoutes = require("./src/routes/userRoute");
const gameRoutes = require("./src/routes/gameRoute");
const contactRoute = require('./src/routes/contactRoute');

const app = express();

if (process.env.NODE_ENV !== "test") {
  app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.path}`);
    next();
  });
}

const allowedOrigins = [
  "http://localhost:4200",
  "http://localhost:3000",
  "http://www.dsp5-archi-f24a-15m-g8.fr",
  "https://www.dsp5-archi-f24a-15m-g8.fr",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy does not allow this origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/api/hello", (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
});


// ... configuration middleware, etc.

app.use("/api/contact", contactRoute);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/game", gameRoutes);

module.exports = app;
