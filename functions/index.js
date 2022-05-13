const functions = require('firebase-functions');
const express = require('express');
const router = require('./routes.js');
const cors = require('cors');
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get('/', (req, res) => res.status(200).send('Hello World!'));

exports.api = functions.https.onRequest(app);
