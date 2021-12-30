const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../client/assets/qa/uploads'); // file path
  },
  filename: (req, file, cb) => {
    //console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get('/api', (req, res) => {
  res.send('hey');
});

app.post('/api/qa/uploads', upload.array('images', 5), (req, res) => {
  const reqFiles = [];
  const url = req.protocol + '://' + req.get('host');
  for (let i = 0; i < req.files.length; i++) {
    reqFiles.push(
      url + __dirname + '/../client/assets/qa/uploads' + req.files[i].filename
    );
  }
  res.send('UPLOADED');
});

app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
