const isLoggedIn = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.redirect("/dashboard");
  }
  next();
};

const notLoggedIn = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
};

module.exports = {
  isLoggedIn,
  notLoggedIn,
};
