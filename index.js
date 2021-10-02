import express from 'express';

let shortUrls = {};

let app = express();

app.get('/:shorturl', (req, res) => {
    if(shortUrls[req.params.shorturl]) {
        res.redirect("https://" + shortUrls[req.params.shorturl]);
    } else {
        res.status(404).send("Unknown url");
    }
});

app.post('/:url', (req, res) => {
    const shortUrl = Date.now().toString(36);
    if(req.query.shortUrl) {
        shortUrls[req.query.shortUrl] = req.params.url;
        res.status(200).send(req.protocol + '://' + req.get('host') + '/' + req.query.shortUrl + '\n');
    } else {
        shortUrls[shortUrl] = req.query.url;
        res.status(200).send(req.protocol + '://' + req.get('host') + '/' + shortUrl + '\n');
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});