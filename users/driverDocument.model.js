const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const DriverDocument = sequelize.define(
  "DriverDocument",
  {
    DocumentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ImageURL: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Caption: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "driver_documents",
  }
);

const User = require("../users/user.model");

DriverDocument.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

module.exports = DriverDocument;
