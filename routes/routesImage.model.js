const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const RoutesImages = sequelize.define(
  "RoutesImages",
  {
    RoutesImageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Caption: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    routes_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "routes_images",
  }
);

module.exports = RoutesImages;
