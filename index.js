import express from 'express';
import urlRouter from './routes/url.js';

let app = express();

app.use('/', urlRouter);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});