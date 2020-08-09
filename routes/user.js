//imports
const express = require("express");
const router = express.Router();
const usermodel = require("../models/usermodel");
var mongoose = require('mongoose');
var controller = require("../controllers/users");

router.get("/", controller.getAll);
router.get("/:email", controller.getOne);
router.post("/addFaculty", controller.addFaculty);
router.post("/addResearch", controller.addResearch);
router.post("/addProject", controller.addProject);

//exports
module.exports = router;