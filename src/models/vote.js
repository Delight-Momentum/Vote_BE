"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    static associate(models) {}
  }
  Vote.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      period_start: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      period_end: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      method: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      participants_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      host_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Vote",
    }
  );
  return Vote;
};
