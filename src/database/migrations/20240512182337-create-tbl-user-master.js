"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_user_masters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:"user"
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
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
    await queryInterface.dropTable("tbl_user_masters");
  },
};
