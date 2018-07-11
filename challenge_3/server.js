const express = require("express");
const parser = require("body-parser");
const port = process.env.PORT || 1024;

const server = express();

server.use(express.static(`${__dirname}/client`));
server.use(parser.json());

server.listen(port, () => console.log(`Listening on port ${port}...`));
