//author :: Thunders
//imports
var mongoose = require('mongoose');
var express = require('express'); 
const usermodel = require("./models/usermodel");
var bodyParser = require('body-parser');
const auth = require("./routes/auth");    //authentication router
var app = express();
var logger =require("./config/logger")
require('dotenv').config();
app.use(bodyParser.json());

var urlencodedparser=bodyParser.urlencoded({extended:false})
app.use("/users/",urlencodedparser,auth);

//running on the port
app.listen(process.env.PUBLIC_PORT,() => {
    console.log("server connected", process.env.PUBLIC_PORT);
})
//Set up default mongoose connection
var mongoDB = process.env.PUBLIC_MONGO_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true ,useCreateIndex: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function(){
    console.log("successfullyconnected");
});

//empty call for checking
app.post("/checking",(req,res)=>{
    logger.info("it is working");
    res.send("working");
});

