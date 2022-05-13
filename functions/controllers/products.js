const HEROKU_URL = require('./heroku-url.js');
const { TOKEN } = require('./config.js');
const axios = require('axios');

module.exports = {
  getProducts: async function (req, res) {
    try {
      const response = await axios.get(`${HEROKU_URL}/products`, {
        params: {
          page: 1,
          count: 200,
        },
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      // const products = res.json(response);
      res.status(200).json(response.data);
    } catch (err) {
      console.error(err);
    }
  },
  getRelatedProducts: async function (req, res) {
    const { product_id } = req.query;
    try {
      const response = await axios.get(
        `${HEROKU_URL}/products/${product_id}/related`,
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      res.status(200).json(response.data);
    } catch (err) {
      console.error(err);
    }
  },
  getProductStyles: async function (req, res) {
    const { product_id } = req.query;
    try {
      const response = await axios.get(
        `${HEROKU_URL}/products/${product_id}/styles`,
        {
          params: {
            product_id: product_id,
          },
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      res.status(200).json(response.data);
    } catch (err) {
      console.error(err);
    }
  },
  getProductInfo: async function (req, res) {
    const { product_id } = req.query;
    try {
      const response = await axios.get(`${HEROKU_URL}/products/${product_id}`, {
        params: {
          product_id: product_id,
        },
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      res.status(200).json(response.data);
    } catch (err) {
      console.error(err);
    }
  },
};
