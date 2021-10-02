import express from 'express';
import urlRouter from './routes/url.js';

let app = express();

app.use('/', urlRouter);

export default app;