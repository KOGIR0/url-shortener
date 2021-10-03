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

function isValidUrl(url) {
    if(url.split('.').length >= 2)
    {
        let regexpURL = /^[^ "@%#$*]+$/; 
        if(regexpURL.test(url)) {
            return true;
        } 
    }
  
    return false;
}

// GET redirect from shorturl to url
router.get('/:shorturl', async (req, res) => {
    const urlMap = await UrlMap.findOne({shortUrl: req.params.shorturl});
    if(urlMap) {
        let url = urlMap.url;
        res.redirect(url);
    } else {
        res.status(404).send("Unknown url");
    }
});

// POST url to shorten, accepts query paretr with custom short url
router.post('/', async (req, res) => {
    if(!req.body.url) {
        res.status(400).send("No url provided");
    }
    let url = req.body.url;
    if(!url.includes("https://") || !url.includes("http://")) {
        url = "https://" + url;
    }
    if(!isValidUrl(url)) {
        res.status(400).send("Invalid URL");
        return;
    }
    // create random short url from date or use custom one
    let shortUrl = req.body.shortUrl ? req.body.shortUrl : Date.now().toString(36);

    let urlMap = await UrlMap.findOne({shortUrl: shortUrl})
    .catch(e => {
        console.log(e);
    })
    if(!urlMap) {
        UrlMap.create({url: url, shortUrl: shortUrl}, (err) => {
            if(err) return console.log(err);
        });
        res.status(200).send({shortUrl: shortUrl});
    } else {
        UrlMap.updateOne({shortUrl: shortUrl}, {url: url, shortUrl: shortUrl}, (err) => {
            if(err) return console.log(err);
        });
        res.status(200).send({shortUrl: shortUrl, updated: urlMap});
    }
});

export default router;