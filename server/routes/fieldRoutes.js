const router = require("express").Router();
const multer = require("multer");
const { getAllFields, fieldController, getAllWellStructuredData, updateFields } = require("../controllers/fieldController");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/fields", upload.single('excelFile'), fieldController);
router.get("/getWellPlanned", getAllWellStructuredData)
router.get("/getAllFields", getAllFields);
router.patch("/updateFields", updateFields);
module.exports = router;
