"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reports", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      voteId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reportType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isOpenReport: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      reportResult: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reports");
  },
};
