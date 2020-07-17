var mongoose = require('mongoose');
//creating schema of users in socialmedia

const user = mongoose.Schema({
    fullname : { type : String, required : true },
    collageId: { type: String, required: true, unique: true },
    email : { type : String, unique: true, required : true },
    qualification: { type: String, required : true },
    designation: { type: String, required: true },
    department: { type: String, required: true},
    research: [{ type: String }],
    dateofJoining : { type: Date, default: Date.now() }
});

const User = mongoose.model("Faculty",user);
module.exports = User;