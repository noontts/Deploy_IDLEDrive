const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");
const CarReview = require("../feedback/review.model");
const CarRental = require("../cars-rental/carRental.model");
const Rentals = require('../Rentals/rentals.model');
const CarImage = require('../cars/carImage.model');

const Cars = sequelize.define("Cars", {
  car_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  make:{
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  fuel_type: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  seat: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  plate: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
  transmission: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  feature: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  car_rental_id_rental: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rentalRate :{
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status :{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  type:{
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  location:{
    type: DataTypes.STRING(100),
    allowNull: false,
  }
},{
  tableName: 'cars',
});


Cars.hasMany(CarReview, { foreignKey: 'car_idcar' });

Cars.belongsTo(CarRental, {
  foreignKey: 'car_rental_id_rental',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

Cars.hasMany(Rentals, { foreignKey: 'car_idcar' });
Cars.hasMany(CarImage, { foreignKey: 'carId'});

module.exports = Cars;
