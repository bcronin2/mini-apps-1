const express = require("express");
const parser = require("body-parser");
const controllers = require("./server/controllers.js");
const port = process.env.PORT || 1024;

const server = express();

server.use(express.static(`${__dirname}/public`));
server.use(parser.json());

server.listen(port, () => console.log(`Listening on port ${port}...`));
