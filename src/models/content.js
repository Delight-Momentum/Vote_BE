"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    static associate(models) {}
  }
  Content.init(
    {
      voteId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Content",
    }
  );
  return Content;
};
