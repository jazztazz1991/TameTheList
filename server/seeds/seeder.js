const mongoose = require("mongoose");
const config = require("../config/config");
const { User, Task, Board, Household, Team } = require("../models");

console.log("Seeder called");

// Connect to the database
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");

    // Function to actually seed the data
    async function seedData() {
      // Try-catch block to handle errors
      try {
        console.log("Deleting all existing data");
        await User.deleteMany({});
        console.log("Users deleted!");
        await Task.deleteMany({});
        console.log("Tasks deleted!");
        await Board.deleteMany({});
        console.log("Boards deleted!");
        await Household.deleteMany({});
        console.log("Households deleted!");
        await Team.deleteMany({});
        console.log("Teams deleted!");

        console.log("Seeding data");

        // Seed the data from JSON files
        const userData = require("./userSeeds.json");
        const taskData = require("./taskSeeds.json");
        const boardData = require("./boardSeeds.json");
        const householdData = require("./householdSeeds.json");
        const teamData = require("./teamSeeds.json");

        console.log("Inserting data");

        // Insert the data into the database
        await User.insertMany(userData);
        console.log("Users seeded!");
        await Task.insertMany(taskData);
        console.log("Tasks seeded!");
        await Board.insertMany(boardData);
        console.log("Boards seeded!");
        await Household.insertMany(householdData);
        console.log("Households seeded!");
        await Team.insertMany(teamData);
        console.log("Teams seeded!");

        console.log("Data seeding complete! Disconnecting from DB");

        // Disconnect from the database
        await mongoose.disconnect();
        console.log("Database connection closed.");
      } catch (err) {
        console.error("Error in seeding:", err);
        process.exit(1);
      }
    }

    // Call the seeding function
    seedData();
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  });
