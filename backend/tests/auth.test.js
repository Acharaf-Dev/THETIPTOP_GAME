const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../src/models/usersModel');

describe('🔐 Auth API - User Registration & Login', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const uri = process.env.MONGO_URI_TEST;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connecté pour les tests !');
  });

  beforeEach(async () => {
    await User.deleteMany(); // Nettoyage des utilisateurs avant chaque test
  });

  afterAll(async () => {
    await mongoose.connection.close(); // ✅ Fermeture propre de la connexion DB
  });

  test('✅ Devrait enregistrer un utilisateur', async () => {
    const newUser = {
      userName: "Azize",
      email: "azizeolougbokiki93@gmail.com",
      password: "Test@1993",
      phone: "06 06 06 06 06",
      address: ["Paris"],
      userType: "admin",
      answer: "test"
    };

    const res = await request(app)
      .post('/auth/register')
      .send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.user.email).toBe(newUser.email.toLowerCase());
  });

  test('❌ Doit échouer si champs requis manquent', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: "azizeolougbokiki93@gmail.com" }); // Pas de password, ni userName

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'all fields are required');
  });

  test('✅ Devrait connecter un utilisateur existant', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        userName: "Azize",
        email: "azizeolougbokiki93@gmail.com",
        password: "Test@1993",
        phone: "06 06 06 06 06",
        address: ["Paris"],
        userType: "admin",
        answer: "test"
      });

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "azizeolougbokiki93@gmail.com",
        password: "Test@1993"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe("azizeolougbokiki93@gmail.com");
  });

  test('❌ Doit échouer à la connexion avec mauvais mot de passe', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        userName: "Azize",
        email: "azizeolougbokiki93@gmail.com",
        password: "Test@1993",
        phone: "06 06 06 06 06",
        address: ["Paris"],
        userType: "admin",
        answer: "test"
      });

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "azizeolougbokiki93@gmail.com",
        password: "WrongPassword"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Invalid email or password');
  });
});