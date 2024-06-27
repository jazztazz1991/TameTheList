const router = require("express").Router();
const {
  getBoards,
  getSingleBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} = require("../../controllers/boardController");
const { verifyToken } = require("../../utils/authMiddleware");

// getBoards tested in Postman at June 25 7:27PM EST
// createBoard tested in Postman at June 25 7:46PM EST
// /api/boards
router.route("/").get(verifyToken, getBoards).post(verifyToken, createBoard);

// getSingleBoard tested in Postman at June 25 7:37PM EST
// updateBoard tested in Insomnia at June 27 1:38PM EST
// deleteBoard tested in Insomnia at June 27 1:46PM EST
// /api/boards/:boardId
router
  .route("/:boardId")
  .get(verifyToken, getSingleBoard)
  .put(verifyToken, updateBoard)
  .delete(verifyToken, deleteBoard);

module.exports = router;
