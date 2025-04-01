const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const UserModel = require("../models/UserModel");
const { findUserByEmail, createUser } = require("../models/UserModel");
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
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.json({
        message: "Login successful",
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
module.exports = UserController;
