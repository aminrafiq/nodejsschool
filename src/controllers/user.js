exports.getDashboard = (req, res, next) => {
  res.render("dashboard", {
    path: "/dashboard",
    pageTitle: "Dashboard",
    isAuthenticated: true,
  });
};
