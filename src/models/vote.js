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
      periodStart: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      periodEnd: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      method: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      participantsName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      hostName: {
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
