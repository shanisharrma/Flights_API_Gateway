const express = require("express");
const { UserController } = require("../../controllers");
const { AuthRequestMiddleware } = require("../../middlewares");

const router = express.Router();

// /api/v1/signup POST
router.post(
  "/signup",
  AuthRequestMiddleware.validateAuthRequest,
  UserController.signup
);

// /api/v1/signin POST
router.post(
  "/signin",
  AuthRequestMiddleware.validateAuthRequest,
  UserController.signin
);

router.post(
  "/role",
  AuthRequestMiddleware.checkAuth,
  AuthRequestMiddleware.isAdmin,
  UserController.addRoleToUser
);

module.exports = router;
