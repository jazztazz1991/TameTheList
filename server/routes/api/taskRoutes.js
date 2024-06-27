const router = require("express").Router();
const {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../../controllers/taskController");

// getTasks tested in postman on June 25 7:22PM EST
// createTask tested in postman on June 25 8:02PM EST
// /api/tasks
router.route("/").get(getTasks).post(createTask);

// getSingleTask tested in postman on June 25 7:39PM EST
// updateTask tested in Insomnia on June 27 1:42PM EST
// /api/tasks/:taskId
// deleteTask tested in Insomnia on June 27 1:50PM EST
router.route("/:taskId").get(getSingleTask).put(updateTask).delete(deleteTask);

module.exports = router;
