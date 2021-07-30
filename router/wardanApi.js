const cons = require('consolidate');
const { response } = require('express');
const express = require('express')

const router = express.Router()
const mongoose=require("mongoose");
const Verify=mongoose.model("Vehicles");
const Challan=mongoose.model("Challan");
const Payment=mongoose.model("Payments");
const License=mongoose.model("License");

router.post('/license',async(req,res)=>{
     const license=await License.findOne(      
        {  
            Cnic : {$regex: req.body.searcrh,$options:"$i" } 
        })
        if(license ){
            console.log(license)
        res.send(license);
        }else{
            res.send({
                message:'license NOT FOUND'
            })
        }
  
    
})
router.post('/vehicle',async(req,res)=>{
    console.log(req.body);
   
     
        const vehicles=await Verify.findOne(      
        {  
           // Numberplate: req.body.searcrh
           Numberplate : {$regex: req.body.searcrh,$options:"$i" } 
        })
        if(vehicles ){
            console.log(vehicles)
        res.send(vehicles);
        }else{
            res.send({
                message:'Vehicle NOT FOUND'
            })
        }
})
router.post('/challan',async(req,res)=>{
    console.log(req.body)

    const newChallan=new Challan();

    newChallan.WardanId=req.body.WardanId,
    newChallan.WardanName=req.body.WardanName,
    newChallan.RegNoOfVehicle=req.body.RegNoOfVehicle,
    newChallan.OffenderName=req.body.OffenderName,
     newChallan.OffenderCnic=req.body.OffenderCnic,
     newChallan.Address=req.body.Address,
     newChallan.ViolationCode=req.body.ViolationCode,
     newChallan.Fine=req.body.Fine,
     newChallan.TrafficSectorName=req.body.TrafficSectorName,
     newChallan.Status=req.body.Status

     await newChallan.save(); 
          res.send(200);
});

router.post('/challanList',async(req,res)=>{
    console.log(req.body);
    const list=await Challan.find({
        RegNoOfVehicle:req.body.RegNoOfVehicle,
//OffenderCnic:req.body.OffenderCnic
        Status:'Pending'
    });
    if(list !=''){
        res.send(list);
    }else{
        res.send({
            message:'No Challan Found!!'
        })
    } 
});
router.get('/challanList',async(req,res)=>{
    const list=await Challan.find({});
    if(list !=''){
        res.send(list);
    }else{
        res.send({
            message:'No Challan Found!!'
        })
    } 
});
router.post('/updateStatus',async(req,res)=>{

    console.log(req.body)
    const IsUpdated= await Challan.findOneAndUpdate(
                     {_id:req.body.UserId},
                    {
                        Status:req.body.Status
                    },
                    {returnNewDocument: true,useFindAndModify:false}
    ) 
    if(IsUpdated){
        res.send(200);
    }
  
})

router.get('/Payments',async(req,res)=>{

    const list=await Payment.find({});
    if(list !=''){
        res.send(list);
    }else{
        res.send({
            message:'No Challan Found!!'
        })
    } 
    
})
module.exports=router;
