const surveyController = require("../controllers/surveyController");

const router = require("express").Router();

router.post("/survey", surveyController);
module.exports = router;
