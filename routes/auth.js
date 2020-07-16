//imports
const express = require("express");
const router = express.Router();
const usermodel = require("../models/usermodel");
var mongoose = require('mongoose');
var controller = require("../controllers/auth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/forgotpassword",controller.forgotpassword);
router.get("/reset/:userid/:token",controller.resetpassword);
router.post("/reset/:userid/:token",controller.updatepassword);
//exports
module.exports = router;