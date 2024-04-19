const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    let token = "";
    if (authorization && authorization.startsWith("Bearer ")) {
      token = authorization.split(" ")[1];
    }
    
    if (!token) next({ name: "invalid-token", message: "Token invalid, harap login terlebih dahulu!" });

    let payload = verifyToken(token);

    let user = await User.findOne({ where: { username: payload.username } });
    if (!user) next({ name: "invalid-token", message: "Token invalid, harap login terlebih dahulu!" });
    else {
      req.user = {
        id: user.id,
        username: payload.username,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
