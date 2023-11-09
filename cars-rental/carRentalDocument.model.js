const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const CarRentalDocument = sequelize.define(
  "CarRentalDocument",
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
    tableName: "car_rental_documents",
  }
);

const CarRental = require("./carRental.model");

CarRentalDocument.belongsTo(CarRental, {
  foreignKey: "car_rental_id",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

module.exports = CarRentalDocument;
