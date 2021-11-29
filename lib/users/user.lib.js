const { User } = require("../../models/user");

const findOne = async (filter, projection, options) => {
  const user = await User.findOne(filter, projection, options);

  return user;
};

const create = async (doc) => {
  const user = await User.create(doc);

  return user;
};

module.exports = { findOne, create };
