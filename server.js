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
app.use(express.urlencoded({ extended: true }));

// API Endpoints
app.get('/api/v1/books/:id', (req, res) => {
  console.log(`You want just ONE book! ${req.params.id}`);
  // res.send('Here is your 1 book!');
  let SQL = `SELECT * FROM books
              WHERE book_id = ${req.params.id};`;
  client.query(SQL)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('/api/v1/books', (req, res) => {
  console.log('OMG I have done been visited by a client!!!!!');
  let SQL = 'SELECT * FROM books;';
  client.query(SQL)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.post('/api/v1/books', (req, res) => {
  console.log(req.body, 'req body POST');
  let SQL = `
  INSERT INTO books(title, author, isbn, image_url, description)
  VALUES ($1, $2, $3, $4, $5);
  `;
  let values = [
    req.body.title,
    req.body.author,
    req.body.isbn,
    req.body.image_url,
    req.body.description
  ];
  client.query(SQL, values).then(results => res.send(`Book was Added`)).catch(console.error); 
  }); // end app.post

app.put('/api/v1/books/:id', (req, res) => {
  console.log(`${req.body} Update with PUT ${req.params.id}`);
  let SQL = `
  UPDATE books SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5
  WHERE book_id=$6; 
  `;
  let values = [
    req.body.title,
    req.body.author,
    req.body.isbn,
    req.body.image_url,
    req.body.description,
    req.params.id
  ];
  client.query(SQL, values).then( () => res.send('Update complete')).catch(console.error);
}); // end app.put 

app.delete('/api/v1/books/:id', (req, res) => {
  console.log(`You are deleteing book id: ${req.params.id}`);
  let SQL = `DELETE FROM books WHERE book_id=$1;`;
  let values = [req.params.id];

  client.query(SQL, values)
    .then(() => res.send(`Delete Complete on ${req.params.id}`))
    .catch(console.error);  
}); // end app.delete 

app.get('*', (req, res) => res.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`The server is alive and well and listening on port ${PORT}!`));
