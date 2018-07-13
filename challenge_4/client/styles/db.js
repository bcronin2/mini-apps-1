"use strict";

const mongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const dbName = "admin";
const collectionName = "connect_n";

module.exports = {
  fetchAll: function(send) {
    queryDB((dbObj, cb) => {
      dbObj
        .collection(collectionName)
        .find({})
        .toArray((err, res) => {
          send(res);
          cb(err, res);
        });
    });
  },

  insertOne: function(json) {
    queryDB((dbObj, cb) => {
      dbObj.collection(collectionName).insertOne(json, cb);
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
