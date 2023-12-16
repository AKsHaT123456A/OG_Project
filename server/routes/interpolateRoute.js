const interpolateController = require("../controllers/interpolateController");
const router = require("express").Router();

router.post("/interpolate",interpolateController);
module.exports = router;
