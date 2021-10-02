// tests/server.test.js
const request = require('supertest');
const app = require('./app');

test('/ping', async () => {
    await request(app)
        .get('/ping')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(({ body }) => {
            expect(body).toEqual({ pong: true });
        });
});