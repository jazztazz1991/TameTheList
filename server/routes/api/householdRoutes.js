const router = require("express").Router();
const {
  getHouseholds,
  getSingleHousehold,
  createHousehold,
  updateHousehold,
  deleteHousehold,
} = require("../../controllers/householdController");
// getHouseholds tested in Postman 6/25 at 7:20PM EST
// createHousehold tested in Postman 6/25 at 7:51PM EST
// /api/households
router.route("/").get(getHouseholds).post(createHousehold);

// getSingleHousehold tested in Postman 6/25 at 7:38PM EST
// /api/households/:householdId
// updateHousehold tested in Insomnia 6/27 at 1:40PM EST
// deleteHousehold tested in Insomnia 6/27 at 1:44PM EST
router
  .route("/:householdId")
  .get(getSingleHousehold)
  .put(updateHousehold)
  .delete(deleteHousehold);

module.exports = router;
