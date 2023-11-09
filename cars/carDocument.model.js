const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig'); // Update the path accordingly

const CarDocument = sequelize.define('CarDocument', {
  DocumentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  documentType: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  ImageURL: {
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
  tableName: 'car_documents',
});

//FK to carID
const Cars = require('./car.model');

CarDocument.belongsTo(Cars, {
  foreignKey: 'carId',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

module.exports = CarDocument;