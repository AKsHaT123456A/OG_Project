const {interpolateController} = require("../controllers/interpolateController");
const router = require("express").Router();

router.post("/interpolate",interpolateController);
router.get("/getInterpolate",interpolateController);
module.exports = router;
