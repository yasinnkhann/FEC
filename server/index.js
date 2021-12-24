const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 1100;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/api', (req, res) => {
  res.send('hey');
});

app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
