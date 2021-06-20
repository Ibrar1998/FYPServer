
const nodemailer = require('nodemailer');
const express = require('express')

const router = express.Router();




router.get('/send',(req,res)=>{
    
var transporter = nodemailer.createTransport({
  

  service:'Gmail',
  ignoreTLS:false,
  secure: false,
  auth: {
    user: '007igill@gmail.com',
    pass: '913600575'
  },
  tls: {
    rejectUnauthorized: false
  }
 
});


var mailOptions = {
    from: '007igill@gmail.com',
    to: 'Zohaibkhattak6@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy! Ibrar Gill'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('not send');
    } else {
      console.log('Email sent: ' + info.response);
      res.send(200);
    }
  });
    
});

module.exports=router;