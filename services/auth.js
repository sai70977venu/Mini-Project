const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const moment = require("moment");
const { usermodel,resetPassword } = require("../models/usermodel");
const { config } = require("process");


//authenticate service
const authenticate = params =>{
    return usermodel.find({email:params.email}).exec().then(user=>{
            if (user.length<1) throw new Error('Authentication failed. Email does not exist.');
            else{
                if (! bcrypt.compareSync(params.password,user[0].password)) throw new Error('Authentication failed. wrong password');
                else{
                        const token = jwt.sign({email: user[0].email,userId:user[0]._id},"secret",{expiresIn:"1h"})
                        return {
                            success:true,
                            userId:user[0]._id,
                            userName:user[0].fullname,
                            status:200,
                            token
                        }
                    }
                }
   }).catch( err => {throw err;})
}


//forgot password: it will send resettoken to mail and stores in datbase
const forgotpassword = params=>{
    const email = params.email
    return usermodel.findOne({ email : email }).exec().then(user=> {
    if (!user) throw new Error('No user found with that email address.');
    else{
            const token = crypto.randomBytes(32).toString('hex');
            let password = new resetPassword({
                userId: user._id,
                resetPasswordToken:token,
                expire: moment.utc().add(6, 'seconds'),
            });
            password.save(function (err) {
                if (err) throw err;
            });
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: { user: process.env.email, pass: process.env.password }
              });
            let mailOptions = {
                from: process.env.email,
                to: email,
                subject: 'Reset your account password',
                html: '<h4><b>Reset Password</b></h4>' +
                '<p>To reset your password, complete this form:</p><br>' +
                '<p>'+  process.env.url+ 'users/reset/' + user._id + '/' + token + '</p>' +
                '<br><br>' +
                '<p>--Team</p>'
                };
                // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info)=>{
                    if(error) throw error  
                })
            return "email sent"
        }
    })
}


//reset password
const resetpassword= params=>{
    return resetPassword.find({userId:params.userid ,resetPasswordToken:params.token, expire: { $gt: Date.now() }}).then(user=>{
        if (user.length==0) {return "'<h3>Password reset token is invalid or has expired.<h3>'";}
          else{return true }
    }).catch(err=>{throw err;});
}


//update password: it will update password in usermodel and delete token in resetpassword model and sends mail to user
const updatepassword= params=>{
   return  bcrypt.hash(params.body.psw,10).then(hash=>{
       return usermodel.findByIdAndUpdate({ _id:params.params.userid },{ password: hash } ).then(result=> {
            return sendmail(params.body, result).then(res=>{
                return resetPassword.deleteOne({resetPasswordToken:params.params.token}).then(result=>{
                    return true;
                }).catch(err=>{throw err;})
            }).catch(err=>{throw err;})
        }).catch(err=>{ throw err;});
    }).catch(error=>{throw error;});  
}


//sending updated password mail
const sendmail = (params, result) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {user: process.env.email,pass: process.env.password}
      });
    let mailOptions = {
        from: process.env.email,
        to: result.email,
        subject: ' Password Updated Sucessfully',
        html: '<h4><b>Password updated</b></h4>' +
        '<p>your account password has updated to '+params.psw+'</p><br>' +
        '<br><br>' +
        '<p>--VNR Vignana Jyothi institute of Engineering and Technology</p>'
        };
    return transporter.sendMail(mailOptions).then(info=>{
        if(info) return "emailsent"
    }).catch(err=>{throw err})
}
module.exports = {
    authenticate,
    forgotpassword,
    resetpassword,
    updatepassword
}