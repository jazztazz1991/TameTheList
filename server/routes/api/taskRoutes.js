const router = require("express").Router();
const {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../../controllers/taskController.js");

// /api/tasks
router.route("/").get(getTasks).post(createTask);

// /api/tasks/:taskId
router.route("/:taskId").get(getSingleTask).put(updateTask).delete(deleteTask);

module.exports = router;
