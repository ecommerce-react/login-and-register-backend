const User = require("../models/user");

class UserService {
  // Create a new user
  static createUser = async (user) => {
    try {
      const newUser = new User(user);
      await newUser.save();

      return newUser;
    } catch (error) {
      throw error;
    }
  };

  // Find one user
  static findOneUser = async (query) => {
    try {
      const user = await User.findOne(query).exec();

      return user;
    } catch (error) {
      throw error;
    }
  };

  // Find user by id
  static findUserById = async (id) => {
    try {
      const user = await User.findById(id).exec();

      return user;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserService;
