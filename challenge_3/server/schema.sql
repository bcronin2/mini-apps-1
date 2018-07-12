DROP DATABASE IF EXISTS shopping;
CREATE DATABASE shopping;
USE shopping;

CREATE TABLE accounts
(
  id INTEGER NOT NULL
  AUTO_INCREMENT,
  username VARCHAR
  (32) UNIQUE,
  email VARCHAR
  (32) UNIQUE,
  password VARCHAR
  (32),
  PRIMARY KEY
  (`id`)
);

  CREATE TABLE addresses
  (
    id INTEGER NOT NULL
    AUTO_INCREMENT,
  account_id INTEGER NOT NULL,
  name VARCHAR
    (32),

  street_1 VARCHAR
    (32),
  street_2 VARCHAR
    (32),
  city VARCHAR
    (16),
  state VARCHAR
    (2),
  zip INTEGER
    (5),
  PRIMARY KEY
    (`id`),
  UNIQUE KEY
    (`street_1`, `zip`),
  FOREIGN KEY
    (`account_id`) REFERENCES accounts
    (`id`)
);

    CREATE TABLE cards
    (
      id INTEGER NOT NULL
      AUTO_INCREMENT,
  account_id INTEGER NOT NULL,
  holder_name VARCHAR
      (32),
  card_number INTEGER
      (19),
  ccv_number INTEGER
      (3),
  expiration DATE,
  PRIMARY KEY
      (`id`),
  UNIQUE KEY
      (`card_number`),
  FOREIGN KEY
      (`account_id`) REFERENCES accounts
      (`id`)
);
