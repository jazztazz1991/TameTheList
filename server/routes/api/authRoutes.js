// authRoutes.js

const router = require("express").Router();
const { logout, login } = require("../../controllers/userController");
const { clearToken } = require("../../utils/authMiddleware");

// POST /api/logout
router.post("/logout", clearToken, logout);

// POST /api/login
router.post("/login", login);

module.exports = router;
