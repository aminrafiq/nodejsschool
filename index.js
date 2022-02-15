require("dotenv").config();

const path = require("path");
const express = require("express");
const csrf = require("csurf");
const session = require("express-session");

const sequelize = require("./utils/database");

const PORT = process.env.PORT || 3000;

const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");
const schoolRoutes = require("./src/routes/school");

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(function (req, res, next) {
  res.locals.fullName = req.session.fullname;
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(userRoutes);
app.use(schoolRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});
