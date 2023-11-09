const { Sequelize } = require("sequelize");
const fs = require('fs');
const path = require('path');

const caFilePath = path.join(__dirname, 'DigiCertGlobalRootCA.crt.pem');

const sequelize = new Sequelize(
  'idledev', // Database name
  'idledrive', // Username with server name
  'hacka!123789Asd', // Password
  {
    host: 'idledev.mysql.database.azure.com',
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(caFilePath),
      },
    },
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
