const router = require("express").Router();
const {
  getBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} = require("../../controllers/boardController");

// get boards tested in Postman at June 25 7:27PM EST
// /api/boards
router.route("/").get(getBoards).post(createBoard);

// /api/boards/:boardId
router
  .route("/:boardId")
  .get(getSingleBoard)
  .put(updateBoard)
  .delete(deleteBoard);

module.exports = router;
