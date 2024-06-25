const { Household, User } = require("../models");

module.exports = {
  // Get all households
  async getHouseholds(req, res) {
    try {
      const households = await Household.find()
        .populate("members")
        .populate("boards");
      res.json(households);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a household
  async getSingleHousehold(req, res) {
    try {
      const household = await Household.findOne({
        _id: req.params.householdId,
      })
        .populate("members")
        .populate("boards");

      if (!household) {
        return res.status(404).json({ message: "No household with that ID" });
      }

      res.json(household);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a household
  async createHousehold(req, res) {
    try {
      const household = await Household.create(req.body);
      res.json(household);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a household
  async deleteHousehold(req, res) {
    try {
      const household = await Household.findOneAndDelete({
        _id: req.params.householdId,
      });

      if (!household) {
        res.status(404).json({ message: "No household with that ID" });
      }

      res.json({ message: "Household deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a household
  async updateHousehold(req, res) {
    try {
      const household = await Household.findOneAndUpdate(
        { _id: req.params.householdId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!household) {
        res.status(404).json({ message: "No household with this id!" });
      }

      res.json(household);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
