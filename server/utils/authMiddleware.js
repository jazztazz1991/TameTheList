const jwt = require("jsonwebtoken");
const { User } = require("../models/"); // Adjust path as per your file structure
const config = require("../config/config"); // Your JWT secret and expiration configuration

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  jwt.verify(token, config.jwtSecret, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user; // Attach user object to request
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

const clearToken = (req, res, next) => {
  // Simply respond with a success message; the client should handle token removal
  res.json({ message: "Logout successful" });
};

module.exports = { verifyToken, clearToken };
