"use strict";

const Sequelize = require("sequelize");
const config = require("../config/config");

const { username, password, database, host, dialect } = config.development;
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

const Vote = require("./vote")(sequelize, Sequelize.DataTypes);
const Content = require("./content")(sequelize, Sequelize.DataTypes);
const Count = require("./count")(sequelize, Sequelize.DataTypes);
const Report = require("./report")(sequelize, Sequelize.DataTypes);

const db = {};
db.Vote = Vote;
db.Content = Content;
db.Count = Count;
db.Report = Report;

module.exports = db;
