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
