"use strict";

const express = require("express");
const app = express();

require("dotenv").config();

const PORT=process.env?.PORT || 8000

require('express-async-errors')

const {dbConnection}=require('./src/configs/dbConnection')
dbConnection()

app.use(express.json())

app.use(require('cookie-session')({secret:process.env.SECRET_KEY}))

app.use(require('./src/middlewares/findSearchSortPage'))

app.all('/',(req,res)=>{
    res.send({
        error:false,
        message:'Welcome to the PERSONNEL API'
    })
})
app.use('/departments',require('./src/routes/department.router'))
app.use('/personnels',require('./src/routes/personnel.router'))
app.use(require('./src/middlewares/errorHandler'))
app.listen(PORT,()=>console.log('Running: http://127.0.0.1:' + PORT))
//require('./src/helpers/sync')()