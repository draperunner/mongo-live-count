const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
const bytes = require('bytes');

const dbAddress = process.env.DB_ADDRESS || '127.0.0.1';
const dbPort = process.env.DB_PORT || '27017';
const db = process.env.DB || 'test';
const collection = process.env.COLLECTION || 'test';
const port = process.env.PORT || 4321;

const mongoAddress = 'mongodb://' + dbAddress + ':' + dbPort + '/' + db
let client

app.use(express.static('client'))

app.get('/count', async (req, res) => {
  try {
    if (!client) {
      client = await MongoClient.connect(mongoAddress)
    }

    const [count, stats] = await Promise.all([
      client.db().collection(collection).estimatedDocumentCount(),
      client.db().collection(collection).stats(),
    ])

    res.json({
      count: count,
      storageSize: bytes.format(stats.storageSize, { unitSeparator: ' ' })
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
});

app.listen(port, () => {
  console.log('Connected to MongoDB instance ' + mongoAddress + ', collection "' + collection + '"');
  console.log('Server listening on port ' + port);
});
