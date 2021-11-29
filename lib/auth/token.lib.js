const JWT = require("jsonwebtoken");

const { JWT_ISS, JWT_MAX_AGE, JWT_AUD, JWT_KEY } = process.env;

const generateToken = (userId) => {
  const options = {
    issuer: JWT_ISS,
    subject: String(userId),
    expiresIn: JWT_MAX_AGE,
    audience: JWT_AUD,
  };

  // Generate Token
  const token = JWT.sign({ id: String(userId) }, JWT_KEY, options);

  return token;
};

module.exports = { generateToken };
