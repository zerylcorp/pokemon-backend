const { User } = require("../models");
class Repository {
  static async createUser(payload) {
    try {
      return await User.create(payload);
    } catch (error) {
      throw error;
    }
  }

  static async findUser(query) {
    try {
      const filter = {
        where: query,
      };
      return await User.findOne(filter);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Repository;
