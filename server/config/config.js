const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file
console.log("config.js process env");
console.log(process.env);
const config = {
  mongoURI: process.env.MONGODB_URI,
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  redirect_uri: process.env.REDIRECT_URI,
  // Add other configuration variables as needed
};

module.exports = config;
