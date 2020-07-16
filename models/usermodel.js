var mongoose = require('mongoose');
//creating schema of users in socialmedia

const user = mongoose.Schema({
    fullname : { type : String, required : true },
    collageId: { type: String, required: true, unique: true },
    email : { type : String, unique: true, required : true},
    password :{ type : String, required : true },
    dateofCreation : { type: Date, default: Date.now() },
    isdeleted :{ type : Boolean, default : false},
    isloggedin : { type : Boolean,default : false} 
   
});
const password = mongoose.Schema({
    userId: { type : String, required : true },
    expire: { type : String, required : true },
    resetPasswordToken: { type : String, unique: true, required : true}
});

const usermodel = mongoose.model("usermodel",user);
const resetPassword = mongoose.model("resetPassword",password);
module.exports = { usermodel, resetPassword };