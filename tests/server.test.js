// tests/server.test.js
import request from 'supertest';
import app from '../server.js';

test('POST valid /:url with random short url', async () => {
    await request(app)
        .post("/")
        .send({"url": "www.google.com"})
        .set("Content-Type", "application/json")
        .expect(200)
        .then(async resp => {
            await request(app)
            .get("/" + resp.body.shortUrl)
            .expect(302)
            .expect('Location', 'https://www.google.com')
        })
});

test('POST valid /:url with custom short url', async () => {
    await request(app)
        .post("/")
        .send({"url": "www.google.com", "shortUrl": "url"})
        .set("Content-Type", "application/json")
        .expect(200, {
            "shortUrl": "url"
        })
        .then(async (resp) => {
            await request(app)
            .get("/url")
            .expect(302)
            .expect('Location', 'https://www.google.com')
        })
});

test('POST invalid /:url', async () => {
    await request(app)
        .post("/")
        .send({"url": "google", "shortUrl": "url"})
        .set("Content-Type", "application/json")
        .expect(400, "Invalid URL")
});