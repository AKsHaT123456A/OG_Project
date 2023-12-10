const {surveyController, updateSurvey, hi} = require("../controllers/surveyController");

const router = require("express").Router();

router.post("/survey", surveyController);
router.post("/updateSurvey",updateSurvey)
router.post("/hi",hi)
module.exports = router;
