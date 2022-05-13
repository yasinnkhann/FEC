const URL = require('./url.js');
const { TOKEN } = require('./config.js');
const axios = require('axios');

module.exports = {
  getReviews: async function (req, res) {
    const { product_id, count } = req.query;
    try {
      const response = await axios.get(`${URL}/reviews`, {
        params: {
          page: 1,
          count: count,
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
  getReviewMetadata: async function (req, res) {
    const { product_id } = req.query;
    try {
      const response = await axios.get(`${URL}/reviews/meta`, {
        params: {
          count: 50,
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
  postReview: async function (req, res) {
    const body = req.body;
    try {
      await axios.post(`${URL}/reviews`, body, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      res.status(201).json('CREATED');
    } catch (err) {
      console.error(err);
    }
  },
  markAsHelpful: async function (req, res) {
    const { review_id } = req.query;
    try {
      await axios.put(
        `${URL}/reviews/${review_id}/helpful`,
        {},
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      res.status(204).json('NO CONTENT');
    } catch (err) {
      console.error(err);
    }
  },
  markReported: async function (req, res) {
    const { review_id } = req.query;
    try {
      await axios.put(
        `${URL}/reviews/${review_id}/report`,
        {},
        {
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      res.status(204).json('NO CONTENT');
    } catch (err) {
      console.error(err);
    }
  },
};
