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

app.use(bodyParser.json());
app.use(express.static(path.resolve(clientDir)));

app.listen(3000, () => {
  console.log('listening on 3000');
});


app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${clientDir}/index.html`));
});

app.post('/api/categories', (req, res) => {
  db.collection('categories').save(req.body, (err, result) => {
    console.log('record added');
    res.status(202).send();
  });
});

app.put('/api/categories/:_id', (req, res) => {
  const { name, icon } = req.body;
  const { _id } = req.params;
  db.collection('categories').update({ _id }, {_id, name, icon }, (err, result) => {
    console.log('record updated');
    res.status(202).send();
  });
});

app.delete('/api/categories/:_id', (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  db.collection('categories').findOne({ _id }, function(err, results) {
    console.log(results);
  });
  db.collection('categories').remove({ _id }, { single: true }, (err, result) => {
    console.log('record deleted', err);
    res.status(202).send();
  })
});

app.get('/api/categories', (req, res) => {
  db.collection('categories').find().toArray(function(err, results) {
    res.send(results);
  });
});