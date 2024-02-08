"use strict"

const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())

// Check Authentication:
app.use(require('./src/middlewares/authentication'))

// Run Logger:
app.use(require('./src/middlewares/logger'))

// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))

/* ------------------------------------------------------- */
// Sending Mail(nodemailler):
const nodemailer=require('nodemailer')
/*
{
  user: 'de5lu2fppf4narey@ethereal.email',
  pass: '4v75A17qrndH8eCUsZ',
  smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
  imap: { host: 'imap.ethereal.email', port: 993, secure: true },
  pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
  web: 'https://ethereal.email'
}
*/

//nodemailer.createTestAccount().then((email)=>console.log(email))
/* const transporter= nodemailer.createTransport({
    host:'smtp.ethereal.email',
    port:587,
    secure:false,
    auth:{
        user:'de5lu2fppf4narey@ethereal.email',
        pass:'4v75A17qrndH8eCUsZ',
        subject:'Hello',
        text:'Hello There....',
        html:'<b>Hello There</b>'
    }
},(error,successInfo)=>{
    (error) ? console.log(error) : console.log(successInfo);

})
// Send Mail:
transporter.sendMail({
    from:'de5lu2fppf4narey@ethereal.email',
    to:"erhanbulut.2021@gmail.com"
}) */
const mailSettings={
    service:'Gmail',
    user:'erhanbulut.2021@gmail.com',
    pass:'uysu nczp jwey qypi'
}
const emailContent={
    from:mailSettings.user,
    to:'erhanbulut.2021@gmail.com, bulutbilisimbusiness@gmail.com',
    subject:'Hello',
    html:'<b>Hello</b> How are you?'
}
const transporter= nodemailer.createTransport({
    service:mailSettings.service,
    auth:{
        user:mailSettings.user,
        pass:mailSettings.pass,
        
    }
})
 transporter.sendMail(emailContent,(error,info)=>{
    error ? console.log(error): console.log(info)
    })
// Routes:

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to RENT A CAR API',
        documents: {
            swagger: '/documents/swagger',
            redoc: '/documents/redoc',
            json: '/documents/json',
        },
        user: req.user
    })
})

// Routes:
app.use(require('./src/routes'))

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
//require('./src/helpers/sync')()