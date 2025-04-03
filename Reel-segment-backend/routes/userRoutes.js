const express = require("express");
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/user", authMiddleware, UserController.getUser);

module.exports = router;
