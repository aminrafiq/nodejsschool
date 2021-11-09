require("dotenv").config();

const path = require("path");
const express = require("express");
const csrf = require("csurf");
const session = require("express-session");

const sequelize = require("./utils/database");

const PORT = process.env.PORT || 3000;

const authRoutes = require("./src/routes/auth");

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

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});
