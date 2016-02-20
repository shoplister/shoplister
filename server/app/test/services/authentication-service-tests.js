/**
 * Created by thaodang on 1/2/16.
 */
require("promise.prototype.finally");
var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;
var mongo = require('../../src/services/mongo-service');
var authenticationService = require('../../src/services/authentication-service');

describe("A valid user", function () {
    before(function() {
        return mongo.init();
    });

    beforeEach(function () {
        console.log("inserting!!")
        return mongo.collection('users').insertOne({
            "username": "batman",
            "password": "IloveRobin"
        });
    });

    it("is authenticated with a valid password", function(done) {
        expect(authenticationService.authenticate("batman", "IloveRobin")).to.be.fulfilled.and.notify(done);
    });

    it("is not authenticated with an invalid password", (done) => {
        expect(authenticationService.authenticate("batman", "IloveRobinhood")).to.be.rejected.and.notify(done);
    });
});
