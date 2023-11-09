const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Rentals = sequelize.define(
  "Rentals",
  {
    RentalID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    RentalStatus: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    RentalStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    RentalEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    TotalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    car_idcar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    carRental_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    tableName: "Rentals"
  }
);

Rentals.belongsTo(require("../users/user.model"), { foreignKey: "user_id" });
Rentals.belongsTo(require("../cars-rental/carRental.model"), {
  foreignKey: "carRental_id",
  onDelete: "CASCADE",
});

module.exports = Rentals;
