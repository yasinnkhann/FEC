const HEROKU_URL = require('./heroku-url.js');
const { TOKEN } = require('./config.js');
const axios = require('axios');

module.exports = {
  logInteraction: async function (req, res) {
    const body = req.body;
    try {
      await axios.post(`${HEROKU_URL}/interactions`, body, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      res.status(201).json('CREATED');
    } catch (err) {
      console.error(err);
      res.status(422).json('UNPROCESSABLE ENTITY');
    }
  },
};
