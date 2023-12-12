const { surveyController, updateSurvey, hi, updateSurveyList, getAllSurveys } = require("../controllers/surveyController");

const router = require("express").Router();

router.post("/survey", surveyController);
router.post("/updateSurveyAzimuth", updateSurvey)
router.post("/updateSurvey", updateSurveyList);
router.get("/allSurveys", getAllSurveys);
module.exports = router;
