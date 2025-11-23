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

// handle POST request to get AI response for the question 
router.post('/', async function (req, res, next) {
  const question = req.body.question; // get the question from the form input

  try {
    // call OpenAI API to get the response
    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: `Answer this question briefly and clearly:\n\n${question}`, // prompt with the user's question
    });

    // extracting the answer from the API response
    const answer =
      response.output?.[0]?.content?.[0]?.text ||
      'Sorry, I could not generate an answer.';

    res.render('index', {
      title: 'Ask AI',
      question,
      answer,
    });
  } catch (err) { // handle any errors from the API call
    console.error(err); // log the error
    res.render('index', {
      title: 'Ask AI',
      question,
      error: 'Something went wrong. Please try again.',
    });
  }
});

// export the router
module.exports = router;
