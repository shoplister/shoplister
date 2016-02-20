/**
 * Created by thaodang on 1/2/16.
 */
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://192.168.55.10:27017/test';

exports.authenticate = (username, password) => {
    return mongoClient.connect(url)
        .then((db) => {
            return db.collection('users').findOne({"username": username})
        })
        .then((doc) => {
            console.log(doc);
            if (doc && doc.password === password) {
                return Promise.resolve(true);
            }
            return Promise.reject(false);
        });
};
