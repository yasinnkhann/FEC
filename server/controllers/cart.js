const URL = require('./url.js');
const { TOKEN } = require ('./config.js');
const axios = require('axios');

module.exports = {
  addToCart: async function(req, res) {
    const { sku_id } = req.query;
    try {
      const response = await axios.post(
        `${URL}/cart`,
        sku_id,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        },
      );
    } catch (err) {
      console.error(err);
    }
  },
  getCart: async function(req, res) {
    try {
      const response = await axios.get(
        `${URL}/cart`,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        },
      );
      res.status(200).json(response.data);
    } catch (err) {
      console.error(err);
    }
  }
};