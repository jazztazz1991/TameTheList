const { Task } = require("../models");

module.exports = {
  // Get all tasks
  async getTasks(req, res) {
    try {
      const tasks = await Task.find().populate("board").populate("assignedTo");
      res.json(tasks);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a task
  async getSingleTask(req, res) {
    try {
      const task = await Task.findOne({
        _id: req.params.taskId,
      })
        .populate("board")
        .populate("assignedTo");

      if (!task) {
        return res.status(404).json({ message: "No task with that ID" });
      }

      res.json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a task
  async createTask(req, res) {
    try {
      const task = await Task.create(req.body);
      res.json(task);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a task
  async deleteTask(req, res) {
    try {
      const task = await Task.findOneAndDelete({
        _id: req.params.taskId,
      });

      if (!task) {
        res.status(404).json({ message: "No task with that ID" });
      }
      res.json({ message: "Task deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a task
  async updateTask(req, res) {
    try {
      const task = await Task.findOneAndUpdate(
        { _id: req.params.taskId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!task) {
        res.status(404).json({ message: "No task with this id!" });
      }

      res.json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
