const User = require('../models/user');
const express = require("express");
const bcrypt =require("bcrypt");
const nodemailer =require("nodemailer");
const { config } = require('winston');

const getAll = async (params) => {
    return  await User.find({ });
}

const getBranch= async (params) => {
    return  await User.find({ department:params.department });
}

const getOne = async (params) => {
    return  await User.find({email:params.email});
}

const addFaculty = async (params) =>{
    return await User.find({collageId:params.collageId})
   .exec()
   .then(user => {
        if (user.length > 0){
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

const addResearch = async (params) => {
    console.log(params);
    return await User.find({ email:params.email })
    .exec()
    .then(user => {
        let researchList = user[0].research;
        let researchURLList = user[0].researchURL;
        researchList.push(params.research);
        researchURLList.push(params.researchURL);
        User.updateOne({ email: params.email }, {$set:{ 'research' : researchList }})
        .exec()
        .then(user => {
            User.updateOne({ email: params.email }, {$set: {'researchURL':researchURLList}})
            .exec()
            .then(res => {
                return res;
            })
            .catch(err => {
                throw err;
            });
        })
        .catch(err => {
            throw err
        });
    })
}

const addProject = async (params) => {
    return await User.find({ email:params.email })
    .exec()
    .then(user => {
        let projectList = user[0].projects;
        let projectDescList = user[0].projectDesc;
        projectList.push(params.project);
        projectDescList.push(params.projectDesc);
        User.updateOne({ email: params.email }, {$set:{ 'projects' : projectList }})
        .exec()
        .then(user => {
            User.updateOne({ email: params.email }, {$set: {'projectDesc': projectDescList }})
            .exec()
            .then(res => {
                return res;
            })
            .catch(err => {
                throw err;
            });
        })
        .catch(err => {
            throw err
        });
    })
}

module.exports = {
    getAll,
    getOne,
    addFaculty,
    addResearch,
    addProject,
    getBranch
}