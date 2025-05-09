// require("dotenv").config();
// jest.setTimeout(15000);

// const request = require("supertest");
// const mongoose = require("mongoose");
// const app = require("../app");
// const userModel = require("../src/models/usersModel");

// // 🧪 Mock l'envoi d'email
// jest.mock("../src/config/emailService", () => ({
//   sendWelcomeEmail: jest.fn(() => Promise.resolve()),
// }));

// describe("User Auth Routes", () => {
//   beforeAll(async () => {
//     await mongoose.connect(process.env.MONGO_URI_TEST);
//   });

//   beforeEach(async () => {
//     await userModel.deleteMany({});
//   });

//   afterAll(async () => {
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//   });

//   const userData = {
//     userName: "John Doe",
//     email: "johndoe@example.com",
//     password: "Password123!",
//   };

//   it("✅ should register a new user and send welcome email", async () => {
//     const res = await request(app)
//       .post("/api/auth/register")
//       .send(userData);

//     expect(res.statusCode).toBe(201);
//     expect(res.body.success).toBe(true);
//     expect(res.body.user).toHaveProperty("email", userData.email);
//   });

//   it("❌ should not register a user with existing email", async () => {
//     // 1er enregistrement
//     await request(app).post("/api/auth/register").send(userData);

//     // 2e tentative avec même email
//     const res = await request(app)
//       .post("/api/auth/register")
//       .send(userData);

//     expect(res.statusCode).toBe(409); // 🚨 erreur attendue
//     expect(res.body.success).toBe(false);
//     expect(res.body.message).toMatch(/already exists/i);
//   });

//   it("❌ should fail registration with invalid password", async () => {
//     const res = await request(app)
//       .post("/api/auth/register")
//       .send({
//         ...userData,
//         password: "weakpass",
//         email: "newemail@example.com",
//       });

//     expect(res.statusCode).toBe(400);
//     expect(res.body.message).toMatch(/password must/i);
//   });
// });

require('dotenv').config({ path: '.env.test' }); // ← charge le bon .env

jest.setTimeout(60000);
// process.env.NODE_ENV = "test";

const request = require("supertest");
const mongoose = require("mongoose");
const connectDB = require("../src/config/db");
const app = require("../app");
const userModel = require("../src/models/usersModel");

// 🧪 Mock l'envoi d'email
jest.mock("../src/config/emailService", () => ({
  sendWelcomeEmail: jest.fn(() => Promise.resolve()),
}));

describe("User Auth Routes", () => {
  beforeAll(async () => {
    // Utilisation de connectDB() pour établir la connexion
    await connectDB();
    console.log("✅ Connexion MongoDB réussie en test !");
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  const userData = {
    userName: "John Doe",
    email: "johndoe@example.com",
    password: "Password123!",
  };

  it("✅ should register a new user and send welcome email", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toHaveProperty("email", userData.email);
  });

  it("❌ should not register a user with existing email", async () => {
    // Premier enregistrement
    await request(app).post("/api/auth/register").send(userData);

    // Deuxième tentative avec le même email
    const res = await request(app)
      .post("/api/auth/register")
      .send(userData);

    expect(res.statusCode).toBe(409);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/already exists/i);
  });

  it("❌ should fail registration with invalid password", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        ...userData,
        password: "weakpass",
        email: "newemail@example.com",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/password must/i);
  });
});
