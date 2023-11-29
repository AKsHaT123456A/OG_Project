const router = require("express").Router();
const multer = require("multer");
const { getAllFields, fieldController } = require("../controllers/fieldcontroller");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/fields",upload.single('excelFile'), fieldController);
router.get("/getAllFields",getAllFields)
module.exports = router;
