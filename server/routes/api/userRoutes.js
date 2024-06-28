const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../../controllers/userController");
const { verifyToken } = require("../../utils/authMiddleware");

// getUsers tested in Postman June 25 7:21 PM EST
// createUser tested in Postman June 25 7:59 PM EST
// /api/users
router.route("/").get(getUsers).post(createUser);

// getSingleUser tested in Postman June 25 7:40 PM EST
// /api/users/:userId
// updateUser tested in Insomnia June 27 1:36 PM EST
// deleteUser tested in Insomnia June 27 1:52 PM EST
// TODO- Discuss with team what should be deleted whe user is deleted- currently connects to tests and removes tasks if they're assigned to the task, which doesn't make sense. Rather- delete user runs and update on the Board where they're assigned to tasks and set the tasks's assignedTo to null?
router
  .route("/:userId")
  .get(verifyToken, getSingleUser)
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);

module.exports = router;
