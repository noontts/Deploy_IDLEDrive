const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    FirstName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    LastName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Birth: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    create_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    profileURL:{
      type: DataTypes.STRING(255),
      defaultValue: 'NOPROFILE.jpg'
    },
    role:{
      type: DataTypes.STRING(32),
      defaultValue: 'user',
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
