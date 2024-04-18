'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class my_pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  my_pokemon.init({
    userId: DataTypes.STRING,
    pokemonName: DataTypes.STRING,
    changeOfName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'my_pokemon',
  });
  return my_pokemon;
};