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
const app =express();
const port=process.env.PORT || 7777
app.use(cors());
const engines=require('consolidate');
app.engine('ejs',engines.ejs);
app.set('views','./views');
app.set('view engine','ejs');
 
//  image access
app.use(express.static(__dirname + '/userImage/'));
app.use(bodyParser.json())
.use(morgan())
app.use(bodyParser.urlencoded({extended:true}));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);






app.use("/",require("./router/register"));
app.use('/login',require('./router/login'));
 // paypal api 
 app.use('/pay',require('./router/paypal'));
 app.use('/ocr',require('./router/OcrModule'));
 app.use('/wardan',require('./router/wardanApi'));
 app.use('/personal',require('./router/PersonalInfo'));
 app.use('/stripe',require('./router/stripepayment'));
 app.use('/mail',require('./router/MailSender'));

//  route not found
// app.use((req,res,next)=>{
//     req.status = 404;
//     const error = new Error("Route no found");
//     next(error);
// });
//  error handing 
if(app.get("env")==='production'){
    app.use((error,req,res,next)=>{
        res.status(req.status || 500).send({
            message:error.message
        });
    }); 
}


app.use((error,req,res,next)=>{
    res.status(req.status || 500).send({
        message:error.message,
        stack:error.stack
    });
});





app.listen(port,function(){
    console.log("Server is running")
})
