const expect = require("chai").expect;
var sinon = require("sinon");
const MongoClient = require("mongodb").MongoClient;
const index = require("../index");

// some fake object that maybe looks like what you have

describe("Test index", function () {
  describe("Test index success", function () {
    let fakeDbSuccess = {
      db() {
        return this;
      },
      collection() {
        return this;
      },
      insertOne() {
        return this;
      },
      close() {
        console.log("close db");
      },
    };
    before(function () {
      sinon
        .stub(MongoClient, "connect")
        .returns(Promise.resolve(fakeDbSuccess));
    });
    after(function () {
      sinon.restore();
    });
    it(" a should return 5", async function () {
      const x = await index();
      console.log(x);
      expect(x).to.be.eql(5);
    });
  });
  describe("Test index fail", function () {
    let fakeDbError = {
      db() {
        return this;
      },
      collection() {
        throw Error("cannot connect to db");
      },
      insertOne() {
        return this;
      },
      close() {
        console.log("close db");
      },
    };
    before(function () {
      sinon.stub(MongoClient, "connect").returns(Promise.resolve(fakeDbError));
    });
    after(function () {
      sinon.restore();
    });
    it(" a should return 0", async function () {
      const x = await index();
      console.log(x);
      expect(x).to.be.eql(0);
    });
  });
});
