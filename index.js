import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.error("DB Connection Error: " + err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/login", async (req, res) => {
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
});

app.post("/register", async (req, res) => {
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
});

app.listen(9002, () => {
  console.log("BE Started at port 9002");
});
