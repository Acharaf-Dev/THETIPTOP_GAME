const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
// const emailService = require("../config/emailService");
const userModel = require("../src/models/usersModel");

// On mock le service d'envoi d'email pour éviter l'envoi réel
jest.mock("../src/config/emailService", () => ({
  sendWelcomeEmail: jest.fn(() => Promise.resolve()),
}));

const { sendWelcomeEmail } = require("../src/config/emailService");

describe("User Auth Routes", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Nettoyage des utilisateurs avant chaque test
    await userModel.deleteMany({ email: "testuser@example.com" });
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user and send welcome email", async () => {
      const res = await request(app).post("/api/auth/register").send({
        userName: "TestUser",
        email: "testuser@example.com",
        password: "Password123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("success", true);
      expect(res.body.user).toHaveProperty("email", "testuser@example.com");
      expect(sendWelcomeEmail).toHaveBeenCalledTimes(1);
    });

    it("should not register a user with existing email", async () => {
      await request(app).post("/api/auth/register").send({
        userName: "TestUser",
        email: "testuser@example.com",
        password: "Password123",
      });

      const res = await request(app).post("/api/auth/register").send({
        userName: "TestUser",
        email: "testuser@example.com",
        password: "Password123",
      });

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("success", false);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login successfully with correct credentials", async () => {
      await request(app).post("/api/auth/register").send({
        userName: "TestUser",
        email: "testuser@example.com",
        password: "Password123",
      });

      const res = await request(app).post("/api/auth/login").send({
        email: "testuser@example.com",
        password: "Password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should fail login with incorrect password", async () => {
      await request(app).post("/api/auth/register").send({
        userName: "TestUser",
        email: "testuser@example.com",
        password: "Password123",
      });

      const res = await request(app).post("/api/auth/login").send({
        email: "testuser@example.com",
        password: "WrongPassword",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("success", false);
    });
  });
});
