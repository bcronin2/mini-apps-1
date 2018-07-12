const db = require("./db.js");

const queryDB = (queryString, callback) => {
  db.query(queryString, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  createAccount: function(accountData, callback) {
    console.log(accountData);
    let accountQuery = `INSERT INTO accounts (username, email, password) VALUES
      ("${accountData.username}", "${accountData.email}", "${
      accountData.password
    }")`;
    queryDB(accountQuery, callback);
  },
  validateAccount: function(accountData, callback) {
    let accountData = req.body;
    models.validateAccount(accountData, (err, results) => res.send(results));
  },
  processTransaction: function(accountData, callback) {
    let formData = req.body;
    models.processTransaction(formData, (err, results) => res.send());
  }
};
