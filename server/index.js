const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();

const port = process.env.PORT || 1100;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../client/assets'); // file path
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10000000000 },
// }).array('image', 5);

app.get('/api', (req, res) => {
  res.send('hey');
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  res.send('Image Uploaded');
});

app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
