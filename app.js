
//basic
const bodyParser=require('body-parser');
const express=require('express');
const router=require('./src/routes/api');
const app=express();


//security middleware
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const xss=require('xss');
const hpp=require('hpp');
const cors=require('cors');
const mongoSanitize=require('express-mongo-sanitize');


//database library import
const mongoose=require('mongoose');


//security middleware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

 
//body pareser implement
app.use(bodyParser.json());


//request rate limit
const limiter=rateLimit({windowMs:15*60*1000,max:3000});
app.use(limiter);


//mongodb connection
const URL='mongodb+srv://salman:Todo1234@cluster0.3tkg5.mongodb.net/'
//let OPTION={user:'',pass:''}; //do not need reason as we use username and password.
mongoose.connect(URL,(err)=>{  
    console.log('Connection Success');
    console.log(err);
});

 

//routing implement
app.use('/api/v1',router);


//undefined route implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"});
});

module.exports=app;