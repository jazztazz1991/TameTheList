const router = require("express").Router();
const {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../../controllers/taskController");

// getTasks tested in postman on June 25 7:22PM EST
// /api/tasks
router.route("/").get(getTasks).post(createTask);

// getSingleTask tested in postman on June 25 7:39PM EST
// /api/tasks/:taskId
router.route("/:taskId").get(getSingleTask).put(updateTask).delete(deleteTask);

module.exports = router;
