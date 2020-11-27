const express = require("express");
const { registerUser, loginUser } = require("../Controllers/dataController");
const { authMiddleWare } = require("../Middleware/middleware");

const router = express.Router();

router.get("/register", registerUser);
router.get("/login", loginUser);

router.use(authMiddleWare);

module.exports = router;
