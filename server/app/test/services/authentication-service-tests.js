/**
 * Created by thaodang on 1/2/16.
 */
require("promise.prototype.finally");
var expect = require("chai").expect;
var mongoClient = require('mongodb').MongoClient;
var authenticationService = require('../../services/authentication-service');
var url = 'mongodb://192.168.55.10:27017/test';

describe("A valid user", () => {
    it("is authenticated with a valid password", (done) => {
        theDb = null;
        mongoClient.connect(url)
        .then((db) => {
            theDb = db;
            collection = db.collection('users');
            return collection.insertOne( {
                "username" : "batman",
                "password" : "IloveRobin"
            });
        })
        .then((result) => {
            console.log("Inserted a document into the users collection.");
            return authenticationService.authenticate("batman", "IloveRobin");
        })
        .then(() => {
            expect(true).is.ok;
        })
        .catch(() => {
            expect(true).is.not.ok;
        })
        .finally(() => {
            if(theDb){theDb.close();}
            done();
        });
    });

    it("is not authenticated with an invalid password", (done) => {
        theDb = null;
        mongoClient.connect(url)
            .then((db) => {
                theDb = db;
                collection = db.collection('users');
                return collection.insertOne( {
                    "username" : "batman",
                    "password" : "IloveRobin"
                });
            })
            .then((result) => {
                console.log("Inserted a document into the users collection.");
                return authenticationService.authenticate("batman", "IloveRobinhood");
            })
            .then(() => {
                expect(true).is.not.ok;
            })
            .catch(() => {
                expect(true).is.ok;
            })
            .finally(() => {
                if(theDb){theDb.close();}
                done();
            });
    });
});
