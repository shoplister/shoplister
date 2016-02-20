/**
 * Created by thaodang on 1/2/16.
 */
require("promise.prototype.finally");
var expect = require("chai").expect;
var mongoClient = require('mongodb').MongoClient;
var authenticationService = require('../../src/services/authentication-service');
var url = 'mongodb://192.168.55.10:27017/test';

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

    it("is authenticated with a valid password", function() {
        return authenticationService.authenticate("batman", "IloveRobin")
            .then(function (result){expect(result).be.true});
    });

    it("is not authenticated with an invalid password", () => {
        return authenticationService.authenticate("batman", "IloveRobinhood")
            .then(function(result) {throw new Error("Should not authenticate user with invalid password")},
            function (result){expect(result).be.false});
    });
});
