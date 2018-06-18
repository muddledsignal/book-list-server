'use strict';

// Application Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

// Application Setup
const app = express();
const PORT = process.env.PORT;

// Database Setup

// Application Middleware
app.use(cors());

// API Endpoints
app.get('/api/v1/test', (req,res) => {
  console.log('OMG I have done been visited by a client!!!!!');
  res.send('OMG I am in contact with the server');
});

app.get('*', (req, res) => res.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`The server is alive and well and listening on port ${PORT}!`));