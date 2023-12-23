const { createLog, deleteLog, editLog, getAllLogs, deleteAllLogs, tie, getTieOnPoint } = require("../controllers/logsController");
const router = require("express").Router();

router.post("/surveyCreate", createLog);
router.post("/surveyDelete", deleteLog);
router.post("/surveyEdit", editLog);
router.get("/allLogs", getAllLogs);
router.delete("/deleteAll", deleteAllLogs);
router.delete("/deleteALog", deleteLog);
router.post("/editTiePnPoint", tie);
router.post("/getTieOnPoint", getTieOnPoint);
router.get("/getTieOnPoint", getTieOnPoint);


module.exports = router;
