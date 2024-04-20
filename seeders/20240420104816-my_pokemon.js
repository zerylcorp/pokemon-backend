"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const pokemons = require("../dummy/my-pokemon.json").map((poke) => {
      poke.createdAt = new Date();
      poke.updatedAt = new Date();
      return poke;
    });
    await queryInterface.bulkInsert("My_pokemons", pokemons);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("My_pokemons", null);
  },
};
