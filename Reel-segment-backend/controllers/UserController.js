const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const UserModel = require("../models/UserModel");
const { findUserByEmail, createUser } = require("../models/UserModel");
const UserModel = require("../models/UserModel");
const generateTokens = require("../utils/generateToken");
const UserController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User Already Exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await createUser(username, email, hashedPassword);
      res
        .status(201)
        .json({ message: "User Created Successfully", user: newUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "User Not Found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const { token, refreshToken } = generateTokens(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/", // Use root path to make cookie available to all endpoints
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await UserModel.findUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      return res.status(200).json({ message: "User Found", user: user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  },
};
module.exports = UserController;
