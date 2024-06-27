const router = require("express").Router();
const {
  getHouseholds,
  getSingleHousehold,
  createHousehold,
  updateHousehold,
  deleteHousehold,
} = require("../../controllers/householdController");
const { verifyToken } = require("../../utils/authMiddleware");

// getHouseholds tested in Postman 6/25 at 7:20PM EST
// createHousehold tested in Postman 6/25 at 7:51PM EST
// /api/households
router
  .route("/")
  .get(verifyToken, getHouseholds)
  .post(verifyToken, createHousehold);

// getSingleHousehold tested in Postman 6/25 at 7:38PM EST
// /api/households/:householdId
// updateHousehold tested in Insomnia 6/27 at 1:40PM EST
// deleteHousehold tested in Insomnia 6/27 at 1:44PM EST
router
  .route("/:householdId")
  .get(verifyToken, getSingleHousehold)
  .put(verifyToken, updateHousehold)
  .delete(verifyToken, deleteHousehold);

module.exports = router;
