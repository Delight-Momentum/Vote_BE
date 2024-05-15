"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Count extends Model {
    static associate(models) {}
  }
  Count.init(
    {
      voteId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      contentId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      participantName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Count",
    }
  );
  return Count;
};
