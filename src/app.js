import express from 'express';
import router from './api/index.js';
import requestTime from './middlewares/request-time.js';
import cors from 'cors';
import {notFoundHandler, errorHandler} from './middlewares/error-handlers.js';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(cors());

app.use(express.static('public'));
// app.use('/images', express.static('public'));

// Middlewaret, myös express on sellainen
// suoritetaan ennen reittejä
app.use(requestTime);

// needed for reading request body in JSON format
app.use(express.json());

// Parses URL-encoded form data (like HTML forms)
app.use(express.urlencoded({extended: true}));

// Ohjataan kaikki /api/v1/-alkuiset pyynnöt apin router middlewarelle (api/index.js)
app.use('/api/v1', router);

// Default for all routes not handled by routers above
app.use(notFoundHandler);
// Add error handler middleware as the last middleware in the chain
app.use(errorHandler);

// käynnistään HTTP-palvelimen kuuntelemaan porttia
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
