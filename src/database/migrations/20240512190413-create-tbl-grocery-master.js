"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_grocery_masters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: { tableName: "tbl_user_masters" }, key: "id" },
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: { tableName: "tbl_user_masters" }, key: "id" },
      },
      deleted_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: { tableName: "tbl_user_masters" }, key: "id" },
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATETIME,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATETIME,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATETIME,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_grocery_masters");
  },
};
