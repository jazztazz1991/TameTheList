const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
} = require("../../controllers/userController");

// getUsers tested in Postman June 25 7:21 PM EST
// createUser tested in Postman June 25 7:59 PM EST
// /api/users
router.route("/").get(getUsers).post(createUser);

// getSingleUser tested in Postman June 25 7:40 PM EST
// /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser);

module.exports = router;
