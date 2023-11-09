const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");
const EventImages = require("../events/eventImage.model");

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    eventName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    locationLink: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    embedLink: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    feature: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    eventTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    locationName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "events",
  }
);

Event.hasMany(EventImages, { foreignKey: "event_Id" });
module.exports = Event;
