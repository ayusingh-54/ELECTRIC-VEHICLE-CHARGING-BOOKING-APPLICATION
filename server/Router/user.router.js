const express = require("express");
const { registerUser, loginUser } = require("../Controllers/userController.js");

const router = express.Router();

// POST /user/register
router.post("/register", registerUser);

// POST /user/login
router.post("/login", loginUser);

module.exports = router;
