const router = require("express").Router();
const multer = require("multer");
const { getAllFields, fieldController, additionalField } = require("../controllers/fieldController");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/fields",upload.single('excelFile'), fieldController);
router.get("/getAllFields",getAllFields);
router.post("/additional", additionalField);
module.exports = router;
