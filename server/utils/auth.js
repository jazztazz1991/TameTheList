// auth.js
const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
  authMiddleware: function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      next(); // Move to the next middleware or route handler
    } catch (error) {
      console.error("JWT verification error:", error.message);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  },

  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
