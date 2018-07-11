"use strict";

const express = require("express");
const parser = require("body-parser");
const utils = require("./utils.js");

const db = require("./db.js");

const port = 3000;

const server = express();

server.use(parser.urlencoded({ extended: true }));
server.use(parser.json());

server.use(express.static(`${__dirname}/client`));

server.post("/csv", (req, res) => {
  let json = req.body;
  let csv = utils.parseToCSV(json);
  db.insertOne({ json: json, csv: csv });
  res.send(csv);
});

server.get("/csv", (req, res) => {
  let results = db.fetchAll(results => {
    res.send(results.map(result => result.csv));
  });
});

server.listen(port);
