const bodyParser= require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const path = require('path');

const clientDir = `${__dirname}/../client/dist`;
let db;
MongoClient.connect('mongodb://FauzanKhan:D3vFauzan!234@ds157964.mlab.com:57964/vocab-learn', (err, database) => {
  if (err) return console.log(err)
  db = database;
});

app.use(express.static(path.resolve(clientDir)));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('listening on 3000');
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${clientDir}/index.html`));
});

app.get('/api/categories', (req, res) => {
  db.collection('categories').find().toArray(function(err, categories) {
    res.send(categories);
  });
});

app.post('/api/categories', (req, res) => {
  db.collection('categories').save(req.body, (err, result) => {
    console.log('record added');
    res.status(202).send();
  });
});

app.put('/api/categories/:_id', (req, res) => {
  const { name, icon } = req.body;
  const _id = new ObjectId(req.params._id);
  db.collection('categories').update({ _id }, { name, icon }, (err, result) => {
    console.log('record updated');
    res.status(202).send();
  });
});

app.delete('/api/categories/:_id', (req, res) => {
  const _id = new ObjectId(req.params._id);
  db.collection('categories').remove({ _id }, { single: true }, (err, result) => {
    console.log('record deleted');
    res.status(202).send();
  })
});

app.get('/api/words', (req, res) => {
  db.collection('words').aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    }
  ], (err, wordsWithCategories) => {
    res.send(wordsWithCategories);
  })
});

app.post('/api/words', (req, res) => {
  const words = Object.assign({}, req.body);
  words.categoryId = new ObjectId(req.body.categoryId);
  db.collection('words').save(words, (err, result) => {
    console.log('record added');
    res.status(202).send();
  });
});

app.put('/api/words/:_id', (req, res) => {
  const { name, definition, synonyms, imageUrl, audio, categoryId } = req.body;
  console.log()
  const _id = new ObjectId(req.params._id);
  db.collection('words').update({ _id }, { name, definition, synonyms, imageUrl, audio, categoryId }, (err, result) => {
    console.log('record updated');
    res.status(202).send();
  });
});

app.delete('/api/words/:_id', (req, res) => {
  const _id = new ObjectId(req.params._id);
  db.collection('words').remove({ _id }, { single: true }, (err, result) => {
    console.log('record deleted', err);
    res.status(202).send();
  })
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${clientDir}/index.html`));
});