"use strict";

const { hashingPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = {
      username: "nanas",
      password: hashingPassword("112233"),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await queryInterface.bulkInsert("Users", [user]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
