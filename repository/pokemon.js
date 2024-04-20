const { where } = require("sequelize");
const { My_pokemon } = require("../models");
const axios = require("axios");

class Repository {
  static async getAllPoke(query) {
    try {
      return await axios.get(`${process.env.POKEMON_URL}/pokemon?limit=${query?.limit}&offset=${query?.offset}`);
    } catch (error) {
      throw error;
    }
  }
  static async getPoke(params) {
    try {
      return await axios.get(`${process.env.POKEMON_URL}/pokemon/${params.pokemonId}`);
    } catch (error) {
      throw error;
    }
  }
  static async getPokeByURL(url) {
    try {
      return await axios.get(url);
    } catch (error) {
      throw error;
    }
  }
  static async getMyPokemonAll() {
    try {
      return await My_pokemon.findAll({ where: { deletedAt: false }, order: [["id", "DESC"]] });
    } catch (error) {
      throw error;
    }
  }
  static async findPokemon(query) {
    const filter = { where: query };
    try {
      return await My_pokemon.findOne(filter);
    } catch (error) {
      throw error;
    }
  }

  static async updatePokemon(payload, query) {
    const filter = { where: { ...query, deletedAt: false } };
    try {
      return await My_pokemon.update(payload, filter);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Repository;
