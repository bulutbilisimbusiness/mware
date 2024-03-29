"use strict"
const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env?.PORT || 8000

require('express-async-errors')


const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

app.use(express.json())
app.use(require('./src/middlewares/authentication'))


app.use(require('./src/middlewares/logger'))

app.use(require('./src/middlewares/findSearchSortPage'))

app.all('/',(req,res)=>{
    res.send({
        error:false,
        message:'Welcome to PIZZA API',
        isLogin:req.isLogin,
        user:req.user
    })
})

app.use('/auth',require('./src/routes/auth'))

app.use('/users',require('./src/routes/user'))

app.use('/orders',require('./src/routes/order'))
app.use('/pizzas',require('./src/routes/pizza'))
app.use('/toppings',require('./src/routes/topping'))

app.use(require('./src/middlewares/errorHandler'))


app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()