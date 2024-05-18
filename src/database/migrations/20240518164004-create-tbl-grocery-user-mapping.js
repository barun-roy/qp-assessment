"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_grocery_user_mappings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      grocery_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: { tableName: "tbl_grocery_masters" }, key: "id" },
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
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_grocery_user_mappings");
  },
};
