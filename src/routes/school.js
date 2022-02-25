const express = require("express");

const { notLoggedIn } = require("../middleware/auth");

const studentsController = require("../controllers/students");

const coursesController = require("../controllers/courses");

const router = express.Router();

router.get("/students", notLoggedIn, studentsController.getStudents);
router.get("/students/add", notLoggedIn, studentsController.addStudent);
router.post("/students/add", notLoggedIn, studentsController.postStudent);
router.get("/courses", notLoggedIn, coursesController.getCourses);
router.get("/courses/add", notLoggedIn, coursesController.addCourse);
router.post("/courses/add", notLoggedIn, coursesController.postCourse);

module.exports = router;
