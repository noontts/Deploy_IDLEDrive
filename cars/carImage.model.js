const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");


const CarImages = sequelize.define('CarImages', {
    CarImageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Caption:{
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    carId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'car_images',
  });
  
  module.exports = CarImages;