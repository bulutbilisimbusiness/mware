"use strict";

const express = require("express");
const app = express();

require("dotenv").config();

const PORT=process.env?.PORT || 8000

require('express-async-errors')

const {dbConnection}=require('./src/configs/dbConnection')
dbConnection()

const morgan=require('morgan')

const fs = require('node:fs')
const now = new Date()
const today = now.toISOString().split('T')[0]
app.use(morgan('combined',{
    stream:fs.createWriteStream(`./logs/${today}.log`,{flags:'a'})
}))
app.use(express.json())

app.use(require('cookie-session')({secret:process.env.SECRET_KEY}))

app.use(require('./src/middlewares/findSearchSortPage'))
//Cookie
/* app.use(async(req,res,next)=>{
    const Personnel=require('./src/models/personnel.model')
    req.isLogin=false
    if (req.session?.id) {
        const user=await Personnel.findOne({_id:req.session.id})
        // if(user.password==req.session.password){
           // req.isLogin=true;
        //} 
        req.isLogin=user.password==req.session.password

    }
    next()
}) */
/* const jwt =require('jsonwebtoken')
app.use((req,res,next)=>{

    const auth=req.headers?.authorization || null
    const accessToken= auth ? auth.split(' ')[1]:null
    req.isLogin=null
    jwt.verify(accessToken,process.env.ACCESS_KEY,function(err,user){
        if(err){
            req.user=null
        }else{
            req.isLogin=true
            req.user=user
        }
    })


next()
}) */

app.use(require('./src/middlewares/authenticated'))
app.all('/',(req,res)=>{
    res.send({
        error:false,
        message:'Welcome to the PERSONNEL API',
        //session:req.session,
        isLogin:req.isLogin,
        user:req.user
    })
})
app.use('/auth',require('./src/routes/auth.router'))
app.use('/departments',require('./src/routes/department.router'))
app.use('/personnels',require('./src/routes/personnel.router'))
app.use(require('./src/middlewares/errorHandler'))
app.listen(PORT,()=>console.log('Running: http://127.0.0.1:' + PORT))
//require('./src/helpers/sync')()