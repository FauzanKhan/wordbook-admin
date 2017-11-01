const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
const express = require('express');
const app = express();
const path = require('path');

const clientDir = `${__dirname}/../client/dist`;
let db;
MongoClient.connect('mongodb://FauzanKhan:D3vFauzan!234@ds157964.mlab.com:57964/vocab-learn', (err, database) => {
  if (err) return console.log(err)
  db = database;
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(clientDir)));

app.listen(3000, () => {
  console.log('listening on 3000');
});


app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${clientDir}/index.html`));
});

app.post('/categories', (req, res) => {
  console.log(req.body);
  db.collection('categories').save(req.body, (err, result) => {
    console.log('saved to database');
    res.redirect('/categories/list');
  });
});

app.get('/categories/new', (req, res) => {
  res.sendFile(`${__dirname}/views/categories/new.html`);
});

app.get('/categories/list', (req, res) => {
  db.collection('categories').find().toArray(function(err, results) {
    console.log(results)
    res.render(`${__dirname}/views/categories/list.ejs`, {categories: results});
  });
});