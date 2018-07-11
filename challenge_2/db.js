const mongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const dbName = "admin";
const collectionName = "json_to_csv";

module.exports = {
  fetchAll: function() {
    queryDB((dbObj, cb) => {
      dbObj
        .collection(dbName)
        .find()
        .toArray(cb);
    });
  },

  insertAll: function(obj) {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        this.insertOne(obj[i]);
      }
    } else {
      this.insertOne(obj);
    }
  },

  insertOne: function(obj) {
    queryDB((dbObj, cb) => {
      dbObj.collection(collectionName).insertOne(obj, cb);
    });
  }
};

const queryDB = cb => {
  mongoClient.connect(
    url,
    (err, db) => {
      let dbObj = db.db(dbName);
      cb(dbObj, (err, res) => db.close());
    }
  );
};
