const models = require("./models.js");

module.exports = {
  createAccount: function(req, res) {
    let accountData = req.body;
    models.createAccount(accountData, (err, results) => res.send(results));
  },
  validateAccount: function(req, res) {
    let accountData = req.body;
    models.validateAccount(accountData, (err, results) => res.send(results));
  },
  processTransaction: function(req, res) {
    let formData = req.body;
    models.processTransaction(formData, (err, results) => res.send());
  }
};
