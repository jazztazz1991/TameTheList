const router = require("express").Router();
const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboardRoutes");

router.use("/");
router.use("/api", apiRoutes);
router.use("/me", dashboardRoutes);

module.exports = router;
