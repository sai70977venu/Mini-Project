const User = require('../models/user');
const express = require("express");
const bcrypt =require("bcrypt");
const nodemailer =require("nodemailer");
const { config } = require('winston');

const getAll = async (params) => {
    return  await User.find({});
}

const getOne = async (params) => {
    return  await User.find({email:params.email});
}

const addFaculty = async (params) =>{
    return await User.find({collageId:params.collageId})
   .exec()
   .then(user => {
        if (user.length >0){
            throw new Error('Registration failed. Faculty already exist.');
        }
        else {
            var newuser = new User(params);
            return newuser.save()
            .then(item => {
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

module.exports = {
    getAll,
    getOne,
    addFaculty
}