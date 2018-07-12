const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  user: "root",
  password: "password",
  database: "shopping"
});

module.exports = dbConnection;
