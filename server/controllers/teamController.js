const { Team, User } = require("../models");

module.exports = {
  // Get all teams
  async getTeams(req, res) {
    try {
      const teams = await Team.find().populate("members");
      res.json(teams);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a team
  async getSingleTeam(req, res) {
    try {
      const team = await Team.findOne({
        _id: req.params.teamId,
      }).populate("members");

      if (!team) {
        return res.status(404).json({ message: "No team with that ID" });
      }

      res.json(team);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a team
  async createTeam(req, res) {
    try {
      const team = await Team.create(req.body);
      res.json(team);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a team
  async deleteTeam(req, res) {
    try {
      const team = await Team.findOneAndDelete({
        _id: req.params.teamId,
      });

      if (!team) {
        res.status(404).json({ message: "No team with that ID" });
      }

      res.json({ message: "Team and deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a team
  async updateTeam(req, res) {
    try {
      const team = await Team.findOneAndUpdate(
        { _id: req.params.teamId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!team) {
        res.status(404).json({ message: "No team with this id!" });
      }

      res.json(team);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
