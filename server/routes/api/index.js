const router = require("express").Router();
const boardRoutes = require("./boardRoutes");
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");
const householdRoutes = require("./householdRoutes");

router.use("/boards", boardRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/households", householdRoutes);

module.exports = router;
