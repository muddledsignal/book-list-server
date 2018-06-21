'use strict';

// Application Dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

// Application Setup
const app = express();
const PORT = process.env.PORT;

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Application Middleware
app.use(cors());

// API Endpoints
app.get('/api/v1/books/:id', (req, res) => {
  console.log('You want just ONE book!'); 
  let SQL = `
    SELECT * FROM books
    WHERE book_id = ${1};`
  let values = [req.params.id]; 
  client.query(SQL, values)
    .then(results => res.send(results.row))
    .catch(console.error); 
}); 

app.get('/api/v1/books', (req, res) => {
  console.log('OMG I have done been visited by a client!!!!!');
  let SQL = 'SELECT * FROM books;';
  client.query(SQL)
    .then(results => res.send(results.rows))
    .catch(console.error);
});


// app.delete('/articles/:id', (request, response) => {
//   console.log('You burn books now?'); 
//   let SQL = `DELETE FROM art'icles WHERE article_id=$1;`;
//   let values = [request.params.id];

//   client.query(SQL, values)
//     .then(() => {

app.get('*', (req, res) => res.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`The server is alive and well and listening on port ${PORT}!`));
