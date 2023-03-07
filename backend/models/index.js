const { Sequelize } = require("sequelize");
const env = require("dotenv").config().parsed.ENVIROMENT;
const process = require("process");
const config = require(__dirname + "/../config/config.json")[env];

const sequalize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

module.exports = sequalize;
