exports.getStudents = (req, res, next) => {
  res.render("school/students", {
    path: "/students",
    pageTitle: "Students",
  });
};
