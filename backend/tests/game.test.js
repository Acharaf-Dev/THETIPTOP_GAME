jest.setTimeout(20000); 
const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = require("../app");
const userModel = require("../src/models/usersModel");
const ticketModel = require("../src/models/winningTicket");
const gainModel = require("../src/models/gainsModel");


// Mock des fonctions d'email
jest.mock("../src/config/emailService", () => ({
  sendAdminNotification: jest.fn(() => Promise.resolve()),
  sendPlayerNotification: jest.fn(() => Promise.resolve()),
  sendPlayerGrandWinnerNotification: jest.fn(() => Promise.resolve()),
  sendAdminGrandWinnerNotification: jest.fn(() => Promise.resolve()),
}));

let clientToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);

  // Nettoyage de la base
  await userModel.deleteMany({});
  await ticketModel.deleteMany({});
  await gainModel.deleteMany({});

  // Création de l'utilisateur client avec mot de passe hashé
  const hashedPassword = await bcrypt.hash("Password123!", 10);
  await userModel.create({
    userName: "GameClient",
    email: "gameclient@example.com",
    password: hashedPassword,
    userType: "client",
  });

  // Connexion du client pour obtenir le token
  const res = await request(app).post("/api/auth/login").send({
    email: "gameclient@example.com",
    password: "Password123!",
  });

  if (!res.body.token) {
    console.error("❌ Login failed:", res.body);
    throw new Error("Échec de l'authentification dans les tests.");
  }

  clientToken = res.body.token;

  // Création d’un ticket gagnant au format string
  await ticketModel.create({
    ticketNumber: "3T-UOAR253",
    prizeWon: "Cadeau",
    prizeValue: 50,
    isUsed: false,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("🎲 Game API", () => {
  it("✅ should allow client to play with a valid ticket", async () => {
    const res = await request(app)
      .post("/api/game/play")
      .set("Authorization", `Bearer ${clientToken}`)
      .send({ ticketNumber: "3T-UOAR253" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.message).toMatch(/Congratulations/i);
  });

  it("❌ should reject replay with same ticket", async () => {
    const res = await request(app)
      .post("/api/game/play")
      .set("Authorization", `Bearer ${clientToken}`)
      .send({ ticketNumber: "3T-UOAR253" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/déjà utilisé/i);
  });

  it("❌ should fail with invalid ticket", async () => {
    const res = await request(app)
      .post("/api/game/play")
      .set("Authorization", `Bearer ${clientToken}`)
      .send({ ticketNumber: "INVALID-999" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Ticket invalide/i);
  });
});
