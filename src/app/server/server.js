const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Enrollment endpoint
app.post('/enroll', (req, res) => {
  console.log('Received data:', req.body);

  // Simple validation
  if (!req.body.email || !req.body.name) {
    return res.status(400).json({
      success: false,
      error: 'Name and email are required'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Enrollment successful!',
    data: req.body
  });
});


app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
