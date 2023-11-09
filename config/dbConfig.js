const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "idledev",
  "root", // Username
  "030431904Asd!", // Password
  {
    host: "localhost",
    dialect: "mysql", //use Mysql
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database authenticate success!");
  } catch (error) {
    console.log("Database authenticate fail!", error);
  }
};

const sync = async () => {
  try {
    await sequelize.sync();
    console.log("Database sequelize sync success!");
  } catch (error) {
    console.log("Database sequelize sync fail!", error);
  }
};

module.exports = { sequelize, connect, sync };
