const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const EventImages = sequelize.define(
  "EventImages",
  {
    EventImageId: {
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
    event_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "event_images",
  }
);

module.exports = EventImages;
