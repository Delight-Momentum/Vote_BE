"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Count extends Model {
    static associate(models) {}
  }
  Count.init(
    {
      vote_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      content_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Count",
    }
  );
  return Count;
};
