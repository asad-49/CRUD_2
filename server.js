require("dotenv").config();
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser')
require('./config/dbCon');
const userRouter=require('./route/userRoute');
const app=express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/api',userRouter);
//app.use('/api',webRouter);
app.listen(3000,()=>{
    console.log("cccc");
})
