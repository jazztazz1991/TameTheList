const router = require("express").Router();
const {
  getHouseholds,
  getSingleHousehold,
  createHousehold,
  updateHousehold,
  deleteHousehold,
} = require("../../controllers/householdController");
// getHouseholds tested 6/25 at 7:20PM EST
// /api/households
router.route("/").get(getHouseholds).post(createHousehold);

// getSingleHousehold tested 6/25 at 7:38PM EST
// /api/households/:householdId
router
  .route("/:householdId")
  .get(getSingleHousehold)
  .put(updateHousehold)
  .delete(deleteHousehold);

module.exports = router;
