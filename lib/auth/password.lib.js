const bcrypt = require("bcryptjs");

const SALT = 10;

const getPasswordHash = (password) => {
  const passwordHash = bcrypt.hashSync(password, SALT);

  return passwordHash;
};

const matchPassword = (password, passwordHash) => {
  const isMatched = bcrypt.compareSync(password, passwordHash);

  return isMatched;
};

module.exports = { getPasswordHash, matchPassword };
