var mongoClient = require('mongodb').MongoClient;

var client;
var collections = {};

exports.init = () => {
    var url = require('./config-service.js').get('mongo.url');
    return mongoClient.connect(url)
    .then((db) => { client = db })
};

exports.collection = (collectionName) => {
    if (!collections[collectionName]) {
        collections[collectionName] = client.collection(collectionName)
    }
    return collections[collectionName];
};