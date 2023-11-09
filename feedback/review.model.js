const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const CarReview = sequelize.define(
  "car_review",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    car_idcar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "car_review",
  }
);

const User = require("../users/user.model");


CarReview.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

module.exports = CarReview;
