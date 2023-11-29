const limiter = require("../middleware/limiter");
const register = require("../controllers/authController");
const router = require("express").Router();

router.post("/register", limiter, register);
module.exports = router;
