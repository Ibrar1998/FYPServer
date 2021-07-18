
const nodemailer = require('nodemailer');
const express = require('express')

const router = express.Router();




router.post('/send',(req,res)=>{
  console.log(req.body)
    
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
    to: req.body.Email,
    subject: 'Islamabad Traffic Police Challan Receipt',
    text: 'Your Challan have been paid\n',
    html:
    `<img width='100px'  src="https://upload.wikimedia.org/wikipedia/en/9/9a/Islamabad_Traffic_Police_Logo.png"/>`+
     `<h4>Challan Details</h4>`+ 
    `<p><b>_id :</b> ${req.body.Data._id}</p>`+
    `<p><b>ChallanTime :</b> ${req.body.Data.ChallanTime}</p>`+
    `<p><b>RegNoOfVehicle :</b> ${req.body.Data.RegNoOfVehicle}</p>`+
    `<p><b>OffenderName :</b> ${req.body.Data.OffenderName}</p>`+
    `<p><b>OffenderCnic :</b> ${req.body.Data.OffenderCnic}</p>`+
    `<p><b>Address :</b> ${req.body.Data.Address}</p>`+
    `<p><b>ViolationCode :</b> ${req.body.Data.ViolationCode}</p>`+
    `<p><b>Fine :</b> ${req.body.Data.Fine}</p>`+
    `<p><b>TrafficSectorName :</b> ${req.body.Data.TrafficSectorName}</p>`
    
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