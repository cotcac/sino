const MongoClient = require("mongodb").MongoClient;
// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "myproject";
module.exports = function () {
  // return 5;
  // Use connect method to connect to the server
  return new Promise((res, rej) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (
      err,
      client
    ) {
      console.log("Connected successfully to server");

      const db = client.db(dbName);
      const collection = db.collection("documents");
      return collection.insertOne({ a: 1 }, function (err, result) {
        console.log("Inserted 1 documents into the collection");
        client.close();
        res(5);
      });
    });
  });
};
