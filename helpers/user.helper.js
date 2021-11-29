const isValidEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase().trim());
};

const strippedUser = (user) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  id: user._id,
});

module.exports = { isValidEmail, strippedUser };
