const router = require("express").Router();
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");
const householdRoutes = require("./householdRoutes");
const boardRoutes = require("./boardRoutes");

router.use("/boards", boardRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/households", householdRoutes);

module.exports = router;
