const express = require("express");
const { UserController } = require("../../controllers");

const router = express.Router();

// /api/v1/signup POST
router.post("/signup", UserController.signup);

// /api/v1/signin POST
router.post("/signin", UserController.signin);

module.exports = router;
