"use strict"


const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env?.PORT || 8000

require('express-async-errors')


const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()


app.use(require('./src/middlewares/errorHandler'))


app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()