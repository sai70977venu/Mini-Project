const express = require("express");
const router = express.Router();
const auth = require("../routes/auth");
const { usermodel } = require("../models/usermodel");
const logger = require("../config/logger");
//services
const FacultyService = require("../services/faculty");
const authService = require('../services/auth');
const userService = require('../services/user');
const { response } = require("express");
const path= require("path");

const getAll = async (req,res,next)=>{
    logger.info("Get All Faculty Details ",req);
    FacultyService.getAll(req.body)
    .then(response => {
        res.send(
            response
        );
    })
    .catch(err => {
        res.send({
            "success":false,
            "error":err.message,
            "status":401
        });
    });
}

const getOne = async (req,res,next)=>{
    logger.info("Get One Faculty Details ",req);
    FacultyService.getOne(req.params)
    .then(response => {
        res.send(
            response
        );
    })
    .catch(err => {
        res.send({
            "success":false,
            "error":err.message,
            "status":401
        });
    });
}

const addFaculty = async (req, res, next) => {
    logger.info("Add Faculty Details",req);
    FacultyService.addFaculty(req.body)
    .then(response => {
        res.send(response);
    })
    .catch(err => {
        res.send({
            "success":false,
            "error":err.message,
            "status":401
        })
    });
}

module.exports = {
    getAll,
    addFaculty
}