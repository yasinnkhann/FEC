const HEROKU_URL = require('./heroku-url.js');
const { TOKEN } = require('./config.js');
const axios = require('axios');

module.exports = {
  markQuestionAsHelpful: async function (req, res) {
    const { question_id } = req.query;
    try {
      await axios.put(
        `${HEROKU_URL}/qa/questions/${question_id}/helpful`,
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
  reportQuestion: async function (req, res) {
    const { question_id } = req.query;
    try {
      await axios.put(
        `${HEROKU_URL}/qa/questions/${question_id}/report`,
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
  markAnswerAsHelpful: async function (req, res) {
    const { answer_id } = req.query;
    try {
      await axios.put(
        `${HEROKU_URL}/qa/answers/${answer_id}/helpful`,
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
  reportAnswer: async function (req, res) {
    const { answer_id } = req.query;
    try {
      await axios.put(
        `${HEROKU_URL}/qa/answers/${answer_id}/report`,
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
  postAnswer: async function (req, res) {
    const { question_id } = req.query;
    const body = req.body;
    try {
      await axios.post(
        `${HEROKU_URL}/qa/questions/${question_id}/answers`,
        body,
        {
          params: {
            question_id: question_id,
          },
          headers: {
            Authorization: `${TOKEN}`,
          },
        }
      );
      res.status(201).json('CREATED');
    } catch (err) {
      console.error(err);
    }
  },
  postQuestion: async function (req, res) {
    const body = req.body;
    try {
      await axios.post(`${HEROKU_URL}/qa/questions`, body, {
        headers: {
          Authorization: `${TOKEN}`,
        },
      });
      res.status(201).json('CREATED');
    } catch (err) {
      console.error(err);
    }
  },
  getQuestions: async function (req, res) {
    const { product_id, count } = req.query;
    try {
      const response = await axios.get(`${HEROKU_URL}/qa/questions`, {
        params: {
          product_id: product_id,
          page: 1,
          count: count,
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
  getAnswers: async function (req, res) {
    const { question_id } = req.query;
    try {
      const response = await axios.get(
        `${HEROKU_URL}/qa/questions/${question_id}/answers`,
        {
          params: {
            question_id: question_id,
            page: 1,
            count: 100,
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
};
