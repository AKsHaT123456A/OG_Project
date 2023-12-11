const { createLog, deleteLog, editLog, getAllLogs } = require("../controllers/logsController");
const router = require("express").Router();

router.post("/surveyCreate", createLog);
router.post("/surveyDelete", deleteLog);
router.post("/surveyEdit", editLog);
router.get("/allLogs",getAllLogs);


module.exports = router;
