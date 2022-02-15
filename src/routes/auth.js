const express = require("express");

const { isLoggedIn, notLoggedIn } = require("../middleware/auth");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/", isLoggedIn, authController.getLogin);

router.post("/", isLoggedIn, authController.postLogin);

router.get("/login", isLoggedIn, authController.getLogin);

router.get("/logout", notLoggedIn, authController.getLogout);

router.get("/register", isLoggedIn, authController.getRegister);

router.post("/login", authController.postLogin);

router.post("/register", authController.postRegister);

//router.post("/logout", authController.postLogout);

module.exports = router;
