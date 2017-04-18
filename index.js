const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dbAddress = process.env.DB_ADDRESS || '127.0.0.1';
const dbPort = process.env.DB_PORT || '27017';
const db = process.env.DB || 'test';
const collection = process.env.COLLECTION || 'test';
const port = process.env.PORT || 4321;

mongoAddress = 'mongodb://' + dbAddress + ':' + dbPort + '/' + db
mongoose.connect(mongoAddress);
const schema = new mongoose.Schema({}, { strict: false });
const Coll = mongoose.model(collection, schema, collection);

app.use(express.static('client'))

app.get('/count', function (req, res) {
  Coll.count({}, (err, count) => {
    if (err) return;
    res.json(count);
  });
});

app.listen(port, function () {
  console.log('Connected to MongoDB instance ' + mongoAddress + ', collection "' + collection + '"');
  console.log('Server listening on port ' + port);
});
