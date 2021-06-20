const express = require("express");

require('express-async-errors');
const bodyParser=require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("./mongo");

//model
require("./model/Register");
require("./model/FeedbackandCompailent");
require("./model/Vehicles");
require("./model/Challan");
const App =express();
const port=7777;
App.use(cors());
const engines=require('consolidate');
App.engine('ejs',engines.ejs);
App.set('views','./views');
App.set('view engine','ejs');
 
//  image access
App.use(express.static(__dirname + '/userImage/'));
App.use(bodyParser.json())
.use(morgan())
App.use(bodyParser.urlencoded({extended:true}));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

App.use(allowCrossDomain);






 App.use("/",require("./router/register"));
 App.use('/login',require('./router/login'));
 // paypal api 
  App.use('/pay',require('./router/paypal'));
  App.use('/ocr',require('./router/OcrModule'));
  App.use('/wardan',require('./router/wardanApi'));
  App.use('/personal',require('./router/PersonalInfo'));
  App.use('/stripe',require('./router/stripepayment'));
  App.use('/mail',require('./router/MailSender'));

//  route not found
App.use((req,res,next)=>{
    req.status = 404;
    const error = new Error("Route no found");
    next(error);
});
//  error handing 
if(App.get("env")==='production'){
    App.use((error,req,res,next)=>{
        res.status(req.status || 500).send({
            message:error.message
        });
    }); 
}


App.use((error,req,res,next)=>{
    res.status(req.status || 500).send({
        message:error.message,
        stack:error.stack
    });
});





App.listen(process.env.PORT || port,function(){
    console.log("Server is running")
})