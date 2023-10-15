const express = require("express");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");

// Initialize the express app
const app = express();

require("dotenv").config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB database
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

// Routes (read routes in the "routes" dir and prepend "/api" to all routes)
fs.readdirSync("./routes").map((route) =>
  app.use(`/api/${process.env.API_VERSION}`, require("./routes/" + route))
);

app.listen(9002, () => {
  console.log("BE Started at port 9002");
});
