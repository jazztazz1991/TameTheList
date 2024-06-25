const router = require("express").Router();
const {
  getHouseholds,
  getSingleHousehold,
  createHousehold,
  updateHousehold,
  deleteHousehold,
} = require("../../controllers/householdController.js");

// /api/households
router.route("/").get(getHouseholds).post(createHousehold);

// /api/households/:householdId
router
  .route("/:householdId")
  .get(getSingleHousehold)
  .put(updateHousehold)
  .delete(deleteHousehold);

module.exports = router;
