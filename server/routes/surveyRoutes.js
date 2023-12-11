const { surveyController, updateSurvey, hi, updateSurveyList } = require("../controllers/surveyController");

const router = require("express").Router();

router.post("/survey", surveyController);
router.post("/updateSurveyAzimuth", updateSurvey)
router.post("/updateSurvey", updateSurveyList);
module.exports = router;
