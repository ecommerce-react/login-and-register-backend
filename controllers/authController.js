const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");

// Register User
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await UserService.findOneUser({ email: email });

  if (existingUser) {
    return res.json({
      message: "Your account already exists, login to continue",
    });
  }

  await UserService.createUser({
    name,
    email,
    password,
  });

  return res.json({
    message: "Signed up successfully, login now!",
  });
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserService.findOneUser({ email: email });

  if (user) {
    if (password === user.password) {
      // Use only the user ID to create JWT token
      const idObject = { _id: user._id };

      // Generate the access token
      const accessToken = jwt.sign(idObject, process.env.JWT_ACCESS_SECRET);

      res.send({
        message: "Login Successfull",
        user: user,
        token: accessToken,
      });
    } else {
      res.send("Wrong password");
    }
  } else {
    res.send("User not registered");
  }
};
