const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const UserRepository = require("../repository/user");

class Controller {
  static async register(req, res, next) {
    try {
      const newUserRegister = await UserRepository.createUser(req.body);
      return res.status(201).json({
        status: "register berhasil",
        data: {
          id: newUserRegister.id,
          username: newUserRegister.username,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { username, password } = req.body;
    try {
      const user = await UserRepository.findUser({ username });

      if (!user) {
        next({ name: "invalid-login", message: "salah username / password" });
      }

      if (comparePassword(password, user?.password)) {
        const access_token = signToken({ username });

        return res.status(200).json({
          status: "login berhasil",
          access_token,
          username: user.username,
        });
      } else {
        next({ name: "invalid-login", message: "salah username / password" });
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
