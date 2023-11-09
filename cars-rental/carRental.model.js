const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const CarRental = sequelize.define(
  "CarRental",
  {
    id_rental: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    rental_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(20),
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
    create_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    profileURL: {
      type: DataTypes.STRING(255),
      defaultValue: "NOPROFILE.jpg",
    },
    role:{
      type: DataTypes.STRING(32),
      defaultValue: 'carRentalOwner',
    },
    location:{
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    FirstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    status:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    tableName: "car_rental",
  }
);

module.exports = CarRental;
