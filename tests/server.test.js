// tests/server.test.js
import request from 'supertest';
import app from '../server.js';
import {UrlMap} from '../models';
import mongoose from 'mongoose';


beforeEach(async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
    } catch (e) {
        console.log("Error connecting to db: ");
        console.log(e);
    }
    await UrlMap.deleteMany({})
    .catch(e => {
        console.log("Error deleting data");
        console.log(e);
    })
});

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

test('POST same shortUrl twice', async () => {
    await request(app)
        .post("/")
        .send({"url": "www.google.com", "shortUrl": "url"})
        .set("Content-Type", "application/json")
        .expect(200)
    await request(app)
        .post("/")
        .send({"url": "yandex.com", "shortUrl": "url"})
        .set("Content-Type", "application/json")
        .expect(200)
    await request(app)
        .get("/url")
        .expect(302)
        .expect("Location", "https://yandex.com")
});