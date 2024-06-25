const router = require("express").Router();
const apiRoutes = require("./api");

// Define a default route if needed
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.use("/api", apiRoutes);

module.exports = router;
