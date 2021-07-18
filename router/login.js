
const express = require('express')
const router = express.Router()

const mongoose=require("mongoose");
const { validate } = require('../model/Register');
const Login=mongoose.model("Register");
//
const Feedback=mongoose.model("FeedbackandCompailent");
//

router.post("/", async(req,res)=>{
    
    console.log(req.body.Email,
       req.body.Password);

    const  Validuser=await Login.find({
        Email:req.body.Email,
        Password:req.body.Password
    });
   // console.log(Validuser);
    if(Validuser!=''){
      //  res.send(200)
        res.json(Validuser);
    }else{
        res.send({
            'message':'invalid username and password'
        })
    } 
});

//admin
router.post('/admin',async(req,res)=>{
        console.log(req.body);
      
        const  Validuser=await Login.find({
            Username:req.body.Username,
            Password:req.body.Password
        });
        if(Validuser!=''){
            res.json(Validuser);
        }else{
            res.send(401,{
                'message':'invalid username and password'
            })
        }  

});


router.post("/feedback",async (req,res)=>{

    console.log(req.body);

          const feedback=new Feedback();  
          const feebackexit= await Feedback.findOne({id:req.body.FeedbackId})
         
        if(feebackexit){
            const feedbackid=feebackexit._id;
          await  Feedback.findOneAndUpdate({_id:feedbackid},{
                $push:{
                    Feedbacks:req.body
                }
            },{useFindAndModify: false,new: true})
        }else{
              feedback.id=req.body.FeedbackId;
              feedback.Feedbacks=req.body;
              await feedback.save();
        }  

    res.send(200);
})
//
router.post("/complaint",async (req,res)=>{

    console.log(req.body);  
          const complaint=new Feedback();
          const complaintexit= await Feedback.findOne({id:req.body.ComplaintId})
        if(complaintexit){
            const complaintid=complaintexit._id;
          await  Feedback.findOneAndUpdate({_id:complaintid},{
                $push:{
                    Complaints:req.body
                }
            },{useFindAndModify: false,new: true})
        }else{
            complaint.id=req.body.ComplaintId;
            complaint.Complaints=req.body;
           await complaint.save();
         
        }  
        
   
    res.send(200);
})
//
module.exports=router;