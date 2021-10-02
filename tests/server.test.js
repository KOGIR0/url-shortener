// tests/server.test.js
import request from 'supertest';
import app from '../server.js';

test('POST valid /:url with random short url', async () => {
    await request(app)
        .post("/www.google.com")
        .expect(200);
});