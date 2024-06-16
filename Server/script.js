// Import required modules
const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express Application
const app = express();
const port = 3000; // Default port, you can customize

// Create a Postgres Connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'aura_cinema_db',
  password: 'COmfirmed14',
  port: 5432,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the Client directory
app.use(express.static(path.join(__dirname, '..', 'Client')));

// Route handler for serving the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Client', 'form.html'));
});

// Route handler for form submission
app.post('/submit-form', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log('Received data:', req.body);

  const query = 'INSERT INTO signup (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)';
  const values = [firstName, lastName, email, password];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error('Error occurred while saving data:', error.message);
      console.error('Error details:', error);
      res.status(500).json({ message: 'An error occurred while saving data to the database.', error: error.message });
    } else {
      res.status(200).json({ message: 'Signup successful' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
