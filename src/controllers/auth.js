const bcrypt = require("bcrypt");
const axios = require("axios");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("login");
};

exports.getRegister = (req, res, next) => {
  res.render("auth/register", {
    path: "/register",
    pageTitle: "Register",
    isAuthenticated: false,
  });
};

async function postRegister(req, res, next) {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  date = year + "-" + month + "-" + date;
  const time = hours + ":" + minutes + ":" + seconds;

  const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      fullname: req.body.fullname,
      password: bcrypt.hashSync(req.body.password, 12),
      date: date,
      time: time,
    },
  });

  if (created) {
    userMessage = user;
  } else {
    userMessage = "User already exist";
  }
  res.send(userMessage);
}

exports.postLogin = (req, res, next) => {
  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        return res.redirect("login");
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((isMatched) => {
          if (isMatched) {
            req.session.isLoggedIn = true;
            req.session.fullname = user.fullname;
            return res.redirect("dashboard");
          }
          res.redirect("login");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

/*
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
*/
module.exports.postRegister = postRegister;
