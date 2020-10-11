# What is this?
If you have to write unit test for your code that need to intergrate with Mongodb this is for you.
# Get stated
```
npm i
```
Run Unit Test
```
npm run test
```
# The work
Just write a Unit Test for this module without connect to real mongodb.
```
const MongoClient = require("mongodb").MongoClient;
// Connection URL
const url = "mongodb://localhost:27018";
// Database Name
const dbName = "myproject";
module.exports = function () {
  // return 5;
  // Use connect method to connect to the server
  return new Promise((res, rej) => {
      let client;
    MongoClient.connect(url, { useUnifiedTopology: true })
    .then((xxx)=>{
        client = xxx;
        console.log("Connected successfully to server");

      const db = client.db(dbName);
      const collection = db.collection("documents");
      return collection.insertOne({ a: 1 });
    })
    .then((c)=>{
        client.close();
        console.log("Inserted 1 documents into the collection");
        res(5);

    })
    .catch(err=>{
        res(0);
    })
  });
};
```
# Solution
```
const expect = require("chai").expect;
var sinon = require("sinon");
const MongoClient = require("mongodb").MongoClient;
const index = require("../index");

// some fake object that maybe looks like what you have

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
```

Reference:
https://stackoverflow.com/questions/51682449/sinon-stub-javascript-method-chain