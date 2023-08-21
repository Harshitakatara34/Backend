const express = require("express");
const { UserModel } = require("../Model/user.model");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

route.post("/signup", async (req, res) => {
  const { email, password, ConfirmPassword } = req.body;

  if (password !== ConfirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and ConfirmPassword do not match" });
  }

  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "Error" });
      } else {
        const user = new UserModel({ email, password: hash });
        await user.save();
        res.status(201).json({ msg: "User registered successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ email: user.email }, "harshi");
          res.send({ msg: "Login successful", token: token });
        } else {
          res.send("Wrong credentials");
        }
      });
    } else {
      res.send("Wrong credentials");
    }
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
});

module.exports = {
  route,
};
