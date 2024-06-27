const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

mongoose.connect(process.env.MONGODB_URI);

module.exports = mongoose.connection;
