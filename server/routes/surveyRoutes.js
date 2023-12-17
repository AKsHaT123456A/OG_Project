const { surveyController, updateSurvey, hi, updateSurveyList, getAllSurveys, uploadSurvey } = require("../controllers/surveyController");

const router = require("express").Router();

router.post("/survey", surveyController);
router.post("/updateSurveyAzimuth", updateSurvey)
router.post("/updateSurvey", updateSurveyList);
router.get("/allSurveys", getAllSurveys);
router.get("/hi", uploadSurvey);
module.exports = router;
