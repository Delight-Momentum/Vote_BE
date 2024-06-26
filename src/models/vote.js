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
      participantNameMethod: {
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
      participantCounts: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Vote",
    }
  );
  return Vote;
};
