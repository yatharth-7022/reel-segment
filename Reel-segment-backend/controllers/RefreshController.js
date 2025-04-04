const jwt = require("jsonwebtoken");
const generateTokens = require("../utils/generateToken");

module.exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newTokens = generateTokens({
      id: decoded.id,
      email: decoded.email,
    });

    // Match cookie settings with login function for consistency
    res.cookie("refreshToken", newTokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Dynamically set based on environment
      sameSite: "Strict", // Match what's in UserController
      path: "/", // Use root path to make cookie available to all endpoints
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ token: newTokens.token });
  } catch (error) {
    console.error("Refresh Token Error:", error);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};
