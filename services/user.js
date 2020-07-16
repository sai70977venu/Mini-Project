
const {usermodel} = require('../models/usermodel');
const express = require("express");
const bcrypt =require("bcrypt");
const nodemailer =require("nodemailer");
const { config } = require('winston');
//create user
const register = params =>{
    return usermodel.find({email:params.email})
   .exec()
   .then(user=>
    {
        if (user.length >0){
            throw new Error('Registration failed. Email already exist.');
        }
        else{
             var pass = params.password
             params.password = bcrypt.hashSync(params.password, 10);
                    
                    var newuser = new usermodel(params);
                    return newuser.save()
                    .then(item => {
                        params.password=pass;
                        sendemail(params);
                        return item;
                    })
                    .catch(err => {
                        throw err;
                    });
            }
    })
    .catch(err=>{
        throw err;
    })
}

//sending welcome email
const sendemail = params => {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            type: "login",
          user: process.env.email,
          pass: process.env.password
        }
      });
    let mailOptions = {
        from: process.env.email,
        to: params.email,
        subject: 'Registration Successful',
        html: '<h4><b>Hello,'+params.fullname+'</b></h4><br/>' +
        '<p>Your Account Credentials </p><br/>' +
        '<p>email -'+params.email+'</p><br/>'+
        '<p>password -'+params.password+'</p><br/>'+
        '<p>--VNR Vignana Jyothi institute of Engineering and Technology</p>'
        };
    return transporter.sendMail(mailOptions, (error, info)=>{
            if(error)
                throw error
            return true
        })
}
module.exports = {
    register
}