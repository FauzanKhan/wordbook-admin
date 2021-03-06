const bodyParser= require('body-parser');
const path = require('path');
const aws = require('aws-sdk');
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const { DB_URL, S3_BUCKET } = process.env;
const clientDir = `${__dirname}/../client/dist`;
let db;

aws.config.region = 'eu-central-1';

console.log(`Connecting to ${DB_URL}`);
MongoClient.connect(DB_URL, (err, database) => {
  if (err) return console.log(err)
  db = database;
});

app.use(express.static(path.resolve(clientDir)));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

/* Categories Resource */
app.get('/api/categories', (req, res) => {
  db.collection('categories').find().toArray((err, categories) => {
    res.send(categories);
  });
});

app.get('/api/categories/:_id/words', (req, res) => {
  const categoryId = new ObjectId(req.params._id);
  db.collection('words').find({ categoryId }).toArray((err, words) => {
    res.send(words);
  });
})

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

/* Words Resource */
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
  req.body.categoryId = new ObjectId(req.body.categoryId);
  const { name, definition, synonyms, imageUrl, audioSrc, audioFileName, categoryId } = req.body;
  const _id = new ObjectId(req.params._id);
  db.collection('words').update({ _id }, { name, definition, synonyms, imageUrl, audioSrc, audioFileName, categoryId }, (err, result) => {
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

app.get('/api/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    res.send({
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    });
  });
});


/* Serve Client on every URI except for the ones defined above */
app.get('*', (req, res) => {
  console.log('Im herer');
  res.sendFile(path.resolve(`${clientDir}/index.html`));
});