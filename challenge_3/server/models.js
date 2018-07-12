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
  createAddress: function(addressData, callback) {
    console.log("address data: " + JSON.stringify(addressData));
    let addressQuery = `INSERT INTO addresses (account_id, street_1, street_2, city, state, zip)
      VALUES (1, "${addressData.street_1}", "${addressData.street_2}",
      "${addressData.city}", "${addressData.state}", ${addressData.zip})`;
    queryDB(addressQuery, callback);
  },
  createCard: function(cardData, callback) {
    console.log("card data: " + JSON.stringify(cardData));
    let cardQuery = `INSERT INTO cards (account_id, card_holder, card_number, ccv_number, expiration)
      VALUES (1, "${cardData.card_holder}", ${cardData.card_number},
      ${cardData.ccv_number}, "${cardData.expiration}")`;
    queryDB(cardQuery, callback);
  },
  processTransaction: function(formData, callback) {
    this.createAddress(formData[2], (err, results) => {
      if (err) {
        callback(err);
      } else {
        this.createCard(formData[3], callback);
      }
    });
  }
};
