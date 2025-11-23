# inClassExercise

### 1. Open Terminal

### 2. Generate a new Express project with Handlebars
```
npx express-generator --view=hbs
```

### 4. Install dependencies
```
npm install
```

### 5. (Optional) Fix vulnerabilities
```
npm audit fix --force
```

### 6. Install OpenAI + dotenv
```
npm install openai dotenv
```

### 7. Create a .env file
Create a file named `.env` in the project root:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### 8. Update .gitignore
Add:
```
node_modules/
.env
```

### 9. Get your API key from OpenAI
Visit https://platform.openai.com
Create a key and paste it inside `.env`.

### 10. Load dotenv inside app.js
Add:
```
require('dotenv').config();
```

### 11. Add OpenAI configuration inside routes/index.js
Add:
```
const OpenAI = require('openai');
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
```

### 12. Add POST route in routes/index.js
```

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

```

### 13. Update views/index.hbs
```

<h1>{{title}}</h1>

<form method="POST" action="/">
  <label for="question">Enter your question:</label>
  <br />
  <textarea
    id="question"
    name="question"
    rows="4"
    cols="50"
    placeholder="Type your question here..."
    required
  >{{question}}</textarea>
  <br />
  <br />

  <button type="submit">Ask</button>
  <button type="button" class="clear-btn" onclick="window.location='/'">
    Clear
  </button>
</form>

{{#if answer}}
  <div class="output-box">
    <h2>Answer:</h2>
    <p>{{answer}}</p>
  </div>
{{/if}}

{{#if error}}
  <p style="color: red">{{error}}</p>
{{/if}}  

```

### 14. Update CSS in /public/stylesheets/style.css
```

body {
  font-family: Arial, sans-serif;
  max-width: 700px;
  margin: 40px auto;
}

textarea {
  width: 100%;
}

button {
  padding: 10px 18px;
  background: #000;
  color: #fff;
  border: none;
  cursor: pointer;
}


.output-box {
  margin-top: 25px;
  padding: 18px;
  border: 1px solid #ddd;
  background: #fafafa;
  border-radius: 8px;
  font-size: 18px;    
}

```

### 15. Start the application
```
npm start
```

### 16. Open in browser
```
http://localhost:3000
```

### 17. Test the app
- Type a question  
- Click Ask  
- See AI-generated answer  
- Click Clear to reset the form  


