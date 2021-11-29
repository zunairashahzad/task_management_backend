const { isEmpty } = require("lodash");
const createError = require("http-errors");

const { isValidEmail, strippedUser } = require("../helpers/user.helper");
const UserLib = require("../lib/users/user.lib");
const PasswordLib = require("../lib/auth/password.lib");
const TokenLib = require("../lib/auth/token.lib");

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Make sure firstName is not empty
    if (isEmpty(firstName)) {
      throw createError(400, "First Name is required");
    }

    // Make sure lastName is not empty
    if (isEmpty(lastName)) {
      throw createError(400, "Last Name is required");
    }

    // Make sure email is not empty
    if (isEmpty(email)) {
      throw createError(400, "Email is required");
    }

    const emailToBeSaved = email.trim().toLowerCase();

    // Make sure it is a valid email
    if (!isValidEmail(emailToBeSaved)) {
      throw createError(400, "Invalid email");
    }

    // Make sure password is present & at least 8 characters long
    if (isEmpty(password) || password.length < 8) {
      throw createError(400, "Password must be 8 characters long");
    }

    // Make sure email is not already taken
    const existingUser = await UserLib.findOne(
      { email: emailToBeSaved },
      { email: 1 },
      { lean: true }
    );

    if (existingUser) {
      throw createError(400, "Email is already taken");
    }

    // Get password hash
    const passwordHash = PasswordLib.getPasswordHash(password);

    // Create User
    const newUser = await UserLib.create({
      firstName,
      lastName,
      email: emailToBeSaved,
      password: passwordHash,
    });

    // Generate Bearer Token
    const token = TokenLib.generateToken(newUser._id);

    res.json({ token, user: strippedUser(newUser) });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError(400, "Invalid Login");
    }

    // Find the user
    const user = await UserLib.findOne(
      { email },
      { firstName: 1, lastName: 1, email: 1, password: 1 },
      { lean: true }
    );

    if (!user) {
      throw createError(400, "Invalid Login");
    }

    // Match Password
    const isMatched = PasswordLib.matchPassword(password, user.password);

    if (!isMatched) {
      throw createError(400, "Invalid Login");
    }

    // Generate Bearer Token
    const token = TokenLib.generateToken(user._id);

    res.json({ token, user: strippedUser(user) });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
