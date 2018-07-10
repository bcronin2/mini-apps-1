"use strict";

const express = require("express");
const parser = require("body-parser");
const utils = require("./utils.js");

const port = 3000;

const server = express();

server.use(parser.urlencoded({ extended: true }));
server.use(parser.json());

server.use(express.static(`${__dirname}/client`));

server.post("/json", (req, res) => {
  let csv = utils.parseToCSV(req.body);
  res.send(csv);
});

server.listen(port);
