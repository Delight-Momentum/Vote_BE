"use strict";

var Sequelize = require("sequelize");
var config = require("../config/config");
var _config$development = config.development,
  username = _config$development.username,
  password = _config$development.password,
  database = _config$development.database,
  host = _config$development.host,
  dialect = _config$development.dialect;
var sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect
});
var Vote = require("./vote")(sequelize, Sequelize.DataTypes);
var Content = require("./content")(sequelize, Sequelize.DataTypes);
var Count = require("./count")(sequelize, Sequelize.DataTypes);
var db = {};
db.Vote = Vote;
db.Content = Content;
db.Count = Count;
module.exports = db;