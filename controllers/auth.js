//imports
const express = require("express");
const router = express.Router();
const auth = require("../routes/auth");
const { usermodel } = require("../models/usermodel");
const logger = require("../config/logger");
//services
const authService = require('../services/auth');
const userService = require('../services/user');
const { response } = require("express");
const path= require("path")
//login
const login = async(req,res,next) => {
   logger.info("login ",req);
    authService.authenticate(req.body)
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
     })
}
//forgot password
const forgotpassword =async(req,res,next)=>{
    logger.info(" reset password",req);
    authService.forgotpassword(req.body).then(response=>{
        res.send({
            message:response
        })
    }).catch(err=>{
        res.send({
            "err":err.message
        })
    })
}

//regiter
const register = async(req,res,next)=>{
    logger.info("register",req);
    userService.register(req.body).then(response=>{
        res.send({
            success :true,
            message:"successfully registered",
            user:response
        })
    }).catch(err=>{res.send({ success:false,"err":err.message})
    })
}
//resetpassword
const resetpassword =async(req,res,next)=>{
   logger.info(" reset password",req);
   authService.resetpassword(req.params).then(response=>{
       if (!response){
         res.send(response);
       }
       else{
        res.sendFile(path.join(__dirname,'/views/resetpassword.html'));
       }
   }).catch(err=>{ res.send({"err":err.message}) })
}
//update password
const updatepassword = async(req,res,next)=>{
    logger.info(" update password");
    authService.updatepassword(req).then(response=>{
        if (response){
            res.sendFile(path.join(__dirname,'/views/result.html'));
        }
    }).catch(err=>{res.send({ "err":err.message})}) 
}

module.exports= {
    login,
    forgotpassword,
    register,
    resetpassword,
    updatepassword
}
