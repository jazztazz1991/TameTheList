const router = require("express").Router();
const {
  getBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} = require("../../controllers/boardController.js");

// /api/boards
router.route("/").get(getBoards).post(createBoard);

// /api/boards/:boardId
router
  .route("/:boardId")
  .get(getSingleBoard)
  .put(updateBoard)
  .delete(deleteBoard);

module.exports = router;
