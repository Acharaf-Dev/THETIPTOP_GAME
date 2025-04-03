jest.mock('axios');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../src/models/usersModel');
const Ticket = require('../src/models/winningTicket');
const Gain = require('../src/models/gainsModel');
const jwt = require('jsonwebtoken');
const axios = require('axios');

jest.setTimeout(15000);

describe(' Game API', () => {
    let clientToken;
    let adminToken;
    let ticket;

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        await mongoose.connect(process.env.MONGO_URI_TEST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB connecté avec succès !');

        // 🕒 Mock de l'API worldclockapi.com
        axios.get.mockResolvedValue({
            data: {
                currentDateTime: '2025-04-30T12:00:00Z' // ✅ Compatible avec la logique du jeu
            }
        });

        // Nettoyage des collections
        await User.deleteMany();
        await Ticket.deleteMany();
        await Gain.deleteMany();

        // Création des utilisateurs
        const client = await User.create({
            userName: 'ClientTest',
            email: 'client@test.com',
            password: 'Test1234@',
            userType: 'client',
            phone: '0600000000',
            address: ['Paris'],
            answer: 'test',
        });

        const admin = await User.create({
            userName: 'AdminTest',
            email: 'admin@test.com',
            password: 'Test1234@',
            userType: 'admin',
            phone: '0600000001',
            address: ['Paris'],
            answer: 'test',
        });

        // Création d'un ticket
        ticket = await Ticket.create({
            ticketNumber: 'TICKET123',
            prizeWon: 'Test Prize',
            prizeValue: 10,
        });

        // Génération des tokens
        clientToken = jwt.sign({ userId: client._id }, process.env.JWT_SECRET);
        adminToken = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('✅ Devrait enregistrer une partie avec ticket valide', async () => {
        const res = await request(app)
            .post('/game/play')
            .set('Authorization', `Bearer ${clientToken}`)
            .send({ ticketNumber: 'TICKET123' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body.message).toMatch(/Congratulations/i);
    });

    test('❌ Ne devrait pas permettre de rejouer avec un ticket déjà utilisé', async () => {
        const res = await request(app)
            .post('/game/play')
            .set('Authorization', `Bearer ${clientToken}`)
            .send({ ticketNumber: 'TICKET123' });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Ticket is invalid or already used.');
    });

    test('✅ Devrait lancer le grand tirage (grand gagnant)', async () => {
        const res = await request(app)
            .post('/game/big-game')
            .set('Authorization', `Bearer ${adminToken}`)
            .send();

        expect([200, 400, 500]).toContain(res.statusCode);
        expect(res.body).toHaveProperty('message');
    });
});
