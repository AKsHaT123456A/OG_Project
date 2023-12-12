const { createLog, deleteLog, editLog, getAllLogs, deleteAllLogs } = require("../controllers/logsController");
const router = require("express").Router();

router.post("/surveyCreate", createLog);
router.post("/surveyDelete", deleteLog);
router.post("/surveyEdit", editLog);
router.get("/allLogs",getAllLogs);
router.delete("/deleteAll",deleteAllLogs);
router.delete("/deleteALog",deleteLog);


module.exports = router;
