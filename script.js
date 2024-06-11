// Import required modules
const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const bodyParser = require('body-parser');

// Connect and Create an Express Application
const app = express();
const port = 3000; // By default, its 3000, you can customize

// Create a Postgres Connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'webappt',
    password: 'agnesismom', // Change to your password
    port: 5432, // Default Port
  });

    //DATABASE CONNECTION
    $connection = pg_connect ('host= localhost','user=postgres','dbname=webappt','password=agnesismom');
    if ($conn-> connection_error) {
     die("Connection failed: " . $conn->connect_error);
    } else {

     // Setup Route handler
    app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'home.html'));
     });


     // Route handler for GET student data
app.get('/students', (req, res) => {
    const query = 'SELECT * FROM signup`;';
  
    pool.query(query, (error, result) => {
      if (error) {
        console.error('Error occurred:', error);
        res.status(500).send('An error occurred while retrieving data from the database.');
      } else {
        const students = result.rows;
        res.json(students);
      }
    });
  });


  // Listening to Requests
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });