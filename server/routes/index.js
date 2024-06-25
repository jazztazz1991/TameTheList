const router = require("express").Router();
const apiRoutes = require("./api");

// tested in Postman 6/25 6:42PM EST
// Define a default route if needed
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

router.use("/api", apiRoutes);

module.exports = router;
