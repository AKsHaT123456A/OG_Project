const { register, redirect } = require("../controllers/authController");
const limiter = require("../middleware/limiter");
const router = require("express").Router();

router.get("/register", limiter, register);
router.get("/:id", redirect);
module.exports = router;
