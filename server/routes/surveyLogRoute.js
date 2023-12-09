const { createLog, deleteLog, editLog } = require("../controllers/logsController");
const router = require("express").Router();

router.post("/surveyCreate/:id", createLog);
router.post("/surveyDelete", deleteLog);
router.post("/surveyEdit", editLog);


module.exports = router;
