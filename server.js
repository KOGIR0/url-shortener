import express from 'express';
import urlRouter from './routes/url.js';
import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.json());
app.use('/', urlRouter);

export default app;