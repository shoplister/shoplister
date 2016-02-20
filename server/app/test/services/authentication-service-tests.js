/**
 * Created by thaodang on 1/2/16.
 */
require("promise.prototype.finally");
var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;
var mongoClient = require('mongodb').MongoClient;
var authenticationService = require('../../src/services/authentication-service');
var url = require('../../src/services/config-service.js').get('mongo.url');

describe("A valid user", function () {
    beforeEach(function () {
        theDb = null;
        mongoClient.connect(url)
            .then((db) => {
                theDb = db;
                collection = db.collection('users');
                collection.insertOne({
                    "username": "batman",
                    "password": "IloveRobin"
                });
                done();
            }).finally(function () {
            if (theDb) {
                theDb.close();
            }
        });
    });

    it("is authenticated with a valid password", function(done) {
        expect(authenticationService.authenticate("batman", "IloveRobin")).to.be.fulfilled.and.notify(done);
    });

    it("is not authenticated with an invalid password", (done) => {
        expect(authenticationService.authenticate("batman", "IloveRobinhood")).to.be.rejected.and.notify(done);
    });
});
