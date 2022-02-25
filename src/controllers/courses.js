const Course = require("../models/course");

exports.getCourses = (req, res, next) => {
  Course.findAll()
    .then((courses) => {
      res.render("school/courses", {
        path: "/courses",
        pageTitle: "Courses",
        courseListStart: 0,
        coursesData: courses,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.addCourse = (req, res, next) => {
  res.render("school/manage-course", {
    path: "/courses/add",
    pageTitle: "Add Course",
  });
};

async function postCourse(req, res, next) {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  date = year + "-" + month + "-" + date;
  time = hours + ":" + minutes + ":" + seconds;

  const [course, created] = await Course.findOrCreate({
    where: { title: req.body.title },
    defaults: {
      description: req.body.description,
      date: date,
      time: time,
    },
  });

  if (created) {
    courseMessage = { result: "success", message: "Course Created" };
  } else {
    courseMessage = { result: "error", message: "Course Already Exist" };
  }
  res.render("school/manage-course", {
    path: "/courses/add",
    pageTitle: "Add Course",
    returnMessage: courseMessage,
  });
}

module.exports.postCourse = postCourse;
