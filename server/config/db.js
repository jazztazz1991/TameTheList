const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

console.log("db.js process env");
console.log(process.env);
mongoose.connect(process.env.MONGODB_URI);

module.exports = mongoose.connection;
