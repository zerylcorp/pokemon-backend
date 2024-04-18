const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class Controller {
  static async register(req, res, next) {
    try {
      const newUserRegister = await User.create(req.body);
      res.status(201).json({
        status: "success to register",
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
      const user = await User.findOne({ where: { username } });

      if (!user) {
        next({ name: "InvalidLogin", message: "wrong username / password" });
      }

      if (comparePassword(password, user?.password)) {
        const access_token = signToken({ username });

        res.status(200).json({
          status: "success to login",
          access_token,
          username: user.username,
        });
      } else {
        next({ name: "InvalidLogin", message: "wrong username / password" });
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
