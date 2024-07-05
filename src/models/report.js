"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class report extends Model {
    static associate(models) {}
  }
  report.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      voteId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      reportType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isOpenReport: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      reportResult: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "report",
    }
  );
  return report;
};
