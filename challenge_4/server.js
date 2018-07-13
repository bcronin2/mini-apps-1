"use strict";

const express = require("express");
const parser = require("body-parser");
const port = process.env.PORT || 4444;

const db = require("./db.js");

const server = express();

server.use(express.static(`${__dirname}/public`));
server.use(parser.json());

server.listen(port, console.log(`Listening on port ${port}...`));

server.post("/games", (req, res) => {
  let json = req.body;
  db.insertOne(json);
  res.send(json);
});

server.get("/games", (req, res) => {
  let results = db.fetchAll(results => {
    res.send(results);
  });
});
