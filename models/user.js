"use strict";
const { Model } = require("sequelize");
const { hashingPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.My_pokemon, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: { message: "username already exist" },
        validate: {
          notNull: { message: "username is require" },
          notEmpty: { message: "not allowed empty character" },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { message: "password is require" },
          notEmpty: { message: "not allowed empty character" },
          min: 5,
          len: [5, 16],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.addHook("beforeCreate", (user) => {
    user.password = hashingPassword(user.password);
  });
  return User;
};
