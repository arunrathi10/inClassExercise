var express = require('express');
var router = express.Router();

const OpenAI = require('openai');
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ask AI' });
});

module.exports = router;
