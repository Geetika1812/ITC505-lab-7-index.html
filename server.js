const express = require('express');
const path = require('path');
const server = express();

// Set up to handle form submission and static files
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'public')));

// Route to serve the Mad Libs form
server.get('/ITC505/lab-7', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// POST route to handle form submission
server.post('/ITC505/lab-7', (req, res) => {
  const { adjective, noun, verb, place, pluralNoun } = req.body;

  // Validation to ensure all fields are filled
  if (!adjective || !noun || !verb || !place || !pluralNoun) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out all fields.</p>
      <a href="/ITC505/lab-7">Go Back to Form</a>
    `);
    return;
  }

  // Generate the Mad Lib story
  const madLib = `
    <h1>Your Mad Lib</h1>
    <p>Once upon a time, there was a <strong>${adjective}</strong> <strong>${noun}</strong> that loved to <strong>${verb}</strong> in the <strong>${place}</strong>.<br>
    It had many <strong>${pluralNoun}</strong> to play with and lived happily ever after.</p>

    <h2>✨ Play Again! ✨</h2>
    <a href="/ITC505/lab-7">Go Back to Form</a>
  `;

  // Send the Mad Lib story
  res.send(madLib);
});

// Route for generating random number (separate URL)
server.get('/do_a_random', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  res.send(`
    <h1>Your Random Number</h1>
    <p>The random number is: <strong>${randomNumber}</strong></p>
    <a href="/ITC505/lab-7">Go back to Mad Libs</a>
  `);
});

// Start the server
let port = 8080;
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
