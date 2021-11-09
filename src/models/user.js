const Sequelize = require("sequelize");

const sequelize = require("../../utils/database");

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false,
      select: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      select: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    time: {
      type: Sequelize.TIME,
      allowNull: true,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    },
  }
);

module.exports = User;
