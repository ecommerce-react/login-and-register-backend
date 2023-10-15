const User = require("../models/user");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (password === user.password) {
      res.send({ message: "Login Successfull", user: user });
    } else {
      res.send("Wrong password");
    }
  } else {
    res.send("User not registered");
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.json({
      message: "Your account already exists, login to continue",
    });
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  newUser.save();

  return res.json({
    message: "Signed up successfully, login now!",
  });
};
