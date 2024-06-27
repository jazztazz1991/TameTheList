const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file
const config = {
  mongoURI: process.env.MONGODB_URI,
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  redirect_uri: process.env.REDIRECT_URI,
  jwtSecret: process.env.SESSION_SECRET,
  jwtExpiration: "1h",
  // Add other configuration variables as needed
};

module.exports = config;
