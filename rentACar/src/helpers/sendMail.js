"use strict"

// node i nodemailer
// sendMail(to:string, subject:string, message:string):

const nodemailer = require('nodemailer')

module.exports = function (to, subject, message) {
 // return true
// Sending Mail(nodemailler):

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
    user:'bulutbilisimbusiness@gmail.com',
    pass:'uysu nczp jwey qypi'
}
const emailContent={
    from:mailSettings.user,
    to:to,//'bulutbilisimbusiness@gmail.com',
    subject:subject,//'Hello',
    text:message,
    html:message//'<b>Hello</b> How are you?'
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
}