const Sequelize = require("sequelize");

const sequelize = require("../../utils/database");

const Course = sequelize.define(
  "courses",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      select: false,
    },
    description: {
      type: Sequelize.STRING(1000),
      allowNull: false,
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
      attributes: { exclude: ["createdAt", "updatedAt"] },
    },
  }
);

module.exports = Course;
