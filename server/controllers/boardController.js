const { Board, User, Household } = require("../models");

module.exports = {
  // Get all boards
  async getBoards(req, res) {
    try {
      const boards = await Board.find()
        .populate("household")
        .populate("user")
        .populate("tasks");
      res.json(boards);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a board
  async getSingleBoard(req, res) {
    try {
      const board = await Board.findOne({ _id: req.params.boardId })
        .populate("household")
        .populate("user")
        .populate("tasks");

      if (!board) {
        return res.status(404).json({ message: "No board with that ID" });
      }

      res.json(board);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a board
  async createBoard(req, res) {
    try {
      const board = await Board.create(req.body);
      res.json(board);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a board
  async deleteBoard(req, res) {
    try {
      const board = await Board.findOneAndDelete({ _id: req.params.boardId });

      if (!board) {
        res.status(404).json({ message: "No board with that ID" });
      }
      res.json(board);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a board
  async updateBoard(req, res) {
    try {
      const board = await Board.findOneAndUpdate(
        { _id: req.params.boardId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!board) {
        res.status(404).json({ message: "No board with this id!" });
      }

      res.json(board);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
