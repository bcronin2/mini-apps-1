const express = require("express");
const parser = require("body-parser");
const port = process.env.PORT || 4444;

const server = express();

server.use(express.static(`${__dirname}/public`));
server.use(parser.json());

server.listen(port, console.log(`Listening on port ${port}...`));
