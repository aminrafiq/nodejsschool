exports.getDashboard = (req, res, next) => {
  res.render("user/dashboard", {
    path: "/dashboard",
    pageTitle: "Dashboard",
    isAuthenticated: true,
  });
};
