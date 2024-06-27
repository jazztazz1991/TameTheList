const router = require("express").Router();
const {
  getBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} = require("../../controllers/boardController");

// getBoards tested in Postman at June 25 7:27PM EST
// createBoard tested in Postman at June 25 7:46PM EST
// /api/boards
router.route("/").get(getBoards).post(createBoard);

// getSingleBoard tested in Postman at June 25 7:37PM EST
// updateBoard tested in Insomnia at June 27 1:38PM EST
// deleteBoard tested in Insomnia at June 27 1:46PM EST
// /api/boards/:boardId
router
  .route("/:boardId")
  .get(getSingleBoard)
  .put(updateBoard)
  .delete(deleteBoard);

module.exports = router;
