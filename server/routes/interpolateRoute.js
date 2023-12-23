const {interpolateController, getInterpolate} = require("../controllers/interpolateController");
const router = require("express").Router();

router.post("/interpolate",interpolateController);
router.get("/getInterpolate",getInterpolate);
module.exports = router;
