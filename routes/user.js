//imports
const express = require("express");
const router = express.Router();
const usermodel = require("../models/usermodel");
var mongoose = require('mongoose');
var controller = require("../controllers/users");

router.get("/", controller.getAll);
router.post("/addFaculty", controller.addFaculty);

//exports
module.exports = router;