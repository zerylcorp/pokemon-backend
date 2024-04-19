"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class My_pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      My_pokemon.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  My_pokemon.init(
    {
      userId: DataTypes.INTEGER,
      pokemonId: DataTypes.STRING,
      pokemonName: DataTypes.STRING,
      changeOfName: DataTypes.STRING,
      deletedAt: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "My_pokemon",
    }
  );
  return My_pokemon;
};
