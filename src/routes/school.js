const express = require("express");

const { notLoggedIn } = require("../middleware/auth");

const studentsController = require("../controllers/students");

const router = express.Router();

router.get("/students", notLoggedIn, studentsController.getStudents);

module.exports = router;
