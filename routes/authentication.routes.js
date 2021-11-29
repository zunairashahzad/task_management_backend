const express = require("express");

const AuthenticationsController = require("../controllers/authentications_controller");

const router = express.Router();

// @route   POST /api/auth/register
// @desc    User Signup Route
router.post("/register", AuthenticationsController.register);

// @route   POST /api/auth/login
// @desc    User Login Route
router.post("/login", AuthenticationsController.login);

module.exports = router;
