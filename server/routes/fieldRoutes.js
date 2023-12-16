const router = require("express").Router();
const multer = require("multer");
const { getAllFields, fieldController, additionalField, getAllWellStructuredData, updateFields } = require("../controllers/fieldController");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/fields", upload.single('excelFile'), fieldController);
router.get("/getWellPlanned", getAllWellStructuredData)
router.get("/getAllFields", getAllFields);
router.update("/updateFields", updateFields);
router.post("/additional", additionalField);
module.exports = router;
