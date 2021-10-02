import express from 'express';
import {UrlMap} from './Models.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let app = express();

try {
    mongoose.connect(process.env.MONGODB_URI);
} catch (e) {
    console.log("Error connecting to db: ");
    console.log(e);
}

app.get('/:shorturl', async (req, res) => {
    const urlMap = await UrlMap.findOne({shortUrl: req.params.shorturl});
    if(urlMap) {
        const url = urlMap.url;
        res.redirect("https://" + url);
    } else {
        res.status(404).send("Unknown url");
    }
});

app.post('/:url', async (req, res) => {
    let shortUrl = Date.now().toString(36);
    if(req.query.shortUrl) {
        shortUrl = req.query.shortUrl;
    }
    let urlMap = await UrlMap.findOne({url: req.params.url, shortUrl: shortUrl});
    if(!urlMap) {
        UrlMap.create({url: req.params.url, shortUrl: shortUrl}, (err, doc) => {
            if(err) return console.log(err);
            console.log("Object saved: ", doc);
        });
    }
    res.status(200).send(req.protocol + '://' + req.get('host') + '/' + shortUrl + '\n');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});