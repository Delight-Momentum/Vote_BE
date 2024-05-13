"use strict";

require("dotenv").config();
var env = process.env;
var development = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  host: env.DB_HOST,
  dialect: "mysql"
};
var test = {
  username: "root",
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql"
};
var production = {
  username: "root",
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: "mysql"
};
module.exports = {
  development: development,
  test: test,
  production: production
};