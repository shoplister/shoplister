var mongo = require('../../common/services/mongo-service');

exports.authenticate = (username, password) => {
    console.log("authenticating... ", username, " password: ", password);
    return mongo.collection('users').findOne({"username": username})
        .then((doc) => {
            if (doc && doc.password === password) {
                return Promise.resolve(true);
            }
            return Promise.reject(false);
        });
};
