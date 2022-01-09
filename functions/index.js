const functions = require("firebase-functions");
const express = require('express');
const path = require('path');
const router = require('./routes.js');
const cors = require('cors');
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(router);

app.get('/', (req, res) => res.status(200).send('Hello World!'));


exports.api = functions.https.onRequest(app);

// https://us-central1-project-catwalk-f2680.cloudfunctions.net/api