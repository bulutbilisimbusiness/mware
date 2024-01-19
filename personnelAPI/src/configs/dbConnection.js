"use strict"

const mongoose=require('mongoose')

const dbConnection=function(){
    mongoose.connect(process.env.MONGODB)
    .then(()=>console.log('* DB Connected *'))
    .catch((err)=> console.error('* DB Not Connect * ',err))
}
module.exports={
    mongoose,
    dbConnection
}