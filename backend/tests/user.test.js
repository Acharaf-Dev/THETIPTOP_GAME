const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../server');
const User = require('../src/models/usersModel');
const Gain = require('../src/models/gainsModel');

// 🧪 Mock du token utilisateur
const generateToken = (userId, userType = "client") => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
};

describe('👤 User API', () => {
  let userToken;
  let userId;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      serverSelectionTimeoutMS: 5000
    });

    // Création d'un utilisateur
    const user = await User.create({
      userName: 'Test User',
      email: 'user@test.com',
      password: 'Test1234@',
      phone: '0101010101',
      address: ['Paris'],
      userType: 'client',
      answer: 'test'
    });

    userId = user._id;
    userToken = `Bearer ${generateToken(user._id, 'client')}`;
  });

  afterAll(async () => {
    await User.deleteMany();
    await Gain.deleteMany();
    await mongoose.connection.close();
  });

  test('✅ GET /user/userprofile doit retourner le profil utilisateur', async () => {
    const res = await request(app)
      .get('/user/userprofile')
      .set('Authorization', userToken);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe('user@test.com');
  });

  test('✅ PUT /user/updateprofile doit mettre à jour le nom utilisateur', async () => {
    const res = await request(app)
      .put('/user/updateprofile')
      .set('Authorization', userToken)
      .send({ userName: 'New Name', email: 'user@test.com' });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.userName).toBe('New Name');
  });

  test('❌ PUT /user/updateprofile échoue si les champs sont manquants', async () => {
    const res = await request(app)
      .put('/user/updateprofile')
      .set('Authorization', userToken)
      .send({ email: '' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message', 'all fields are required');
  });

  test('✅ GET /user/mygains retourne 404 si aucun gain trouvé', async () => {
    const res = await request(app)
      .get('/user/mygains')
      .set('Authorization', userToken);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'No gains found');
  });
});
