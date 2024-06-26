const router = require("express").Router();
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");
const householdRoutes = require("./householdRoutes");
const boardRoutes = require("./boardRoutes");

router.use("/boards", boardRoutes);
// Tested in Postman 6/25 6:43PM EST
router.use("/users", userRoutes);
// Tested in Postman 6/25 6:50PM EST
router.use("/tasks", taskRoutes);
router.use("/households", householdRoutes);

module.exports = router;
