const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");
const RoutesImage = require("../routes/routesImage.model");
const User = require("../users/user.model");

const Routes = sequelize.define(
  "Routes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    length: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    embedLink: {
      type: DataTypes.TEXT, // ใช้ TEXT เนื่องจาก EmbedLink มีข้อมูลที่มาก
      allowNull: false,
    },
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status:{
      type : DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    tableName: "routes",
  }
);

Routes.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

Routes.hasMany(RoutesImage, { foreignKey: "routes_Id" });
module.exports = Routes;
