const router = require("express").Router();
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");
const householdRoutes = require("./householdRoutes");
const boardRoutes = require("./boardRoutes");
const authRoutes = require("./authRoutes");

// Full CRUD testing completed 6/27 1:55PM EST
// /api/boards
router.use("/boards", boardRoutes);
// Full CRUD testing completed 6/27 1:55PM EST
// /api/users
router.use("/users", userRoutes);
// Full CRUD testing completed 6/27 1:55PM EST
// /api/tasks
router.use("/tasks", taskRoutes);
// Full CRUD testing completed 6/27 1:55PM EST
// /api/households
router.use("/households", householdRoutes);
// TODO - Test authentication
router.use("/auth", authRoutes);

module.exports = router;
