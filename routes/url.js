import express from 'express';
import mongoose from 'mongoose';
import {UrlMap} from '../models.js';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

try {
    mongoose.connect(process.env.MONGODB_URI);
} catch (e) {
    console.log("Error connecting to db: ");
    console.log(e);
}

function isValidUrl() {
    let url;
  
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
}

// GET redirect from shorturl to url
router.get('/:shorturl', async (req, res) => {
    const urlMap = await UrlMap.findOne({shortUrl: req.params.shorturl});
    if(urlMap) {
        let url = urlMap.url;
        if(!url.toString().includes('https://')) {
            url = "https://" + url;
        }
        res.redirect(url);
    } else {
        res.status(404).send("Unknown url");
    }
});

// POST url to shorten, accepts query paretr with custom short url
router.post('/:url', async (req, res) => {
    if(!isValidUrl(req.params.url)) {
        res.status(500).send("Invalid URL");
        return;
    }
    let shortUrl = Date.now().toString(36);
    if(req.query.shortUrl) {
        shortUrl = req.query.shortUrl;
    }
    let urlMap = await UrlMap.findOne({shortUrl: shortUrl});
    if(!urlMap) {
        UrlMap.create({url: req.params.url, shortUrl: shortUrl}, (err, doc) => {
            if(err) return console.log(err);
            console.log("Object saved: ", doc);
        });
    } else {
        UrlMap.updateOne({shortUrl: shortUrl}, {url: req.params.url, shortUrl: shortUrl}, (err, doc) => {
            if(err) return console.log(err);
            console.log(doc);
        });
    }
    res.status(200).send(req.protocol + '://' + req.get('host') + '/' + shortUrl + '\n');
});

export default router;