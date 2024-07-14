const express = require("express");
const router = express.Router();

// import controller 
const {signup, login, logout} = require("../controllers/user");



router.post("/login", login);

router.get("/signup", signup);
router.get("/logout", logout);

module.exports = router;