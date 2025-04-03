const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  console.log("Received Token:", token);

  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY
    );
    req.user = decoded;
    console.log("Decoded User:", req.user);
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
