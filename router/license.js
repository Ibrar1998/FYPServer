

const express = require('express')
const router = express.Router();
const mongoose=require("mongoose");
const License=mongoose.model("License");

router.post('/createlicense',async(req,res)=>{
    console.log(req.body);

    const  license = new License();
    license.UserId=req.body.UserId;
    license.Status=req.body.Status;
    license.LicenseInfo=req.body.LicenseInfo;
    license.Cnic=req.body.Cnic;
    await license.save();
    
    res.send(200)
});

router.get('/:LicenseID',async(req,res)=>{
    console.log(req.params.LicenseID);
    const validLicense=await License.findOne({UserId:req.params.LicenseID});
    res.send(validLicense);
});
router.get('/',async(req,res)=>{
    const validLicense=await License.find({});
    res.send(validLicense);
});
//  
router.post('/LicenseStatus',async(req,res)=>{

    console.log(req.body)
    const IsUpdated= await License.findOneAndUpdate(
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
router.post('/LicenseTest',async(req,res)=>{

    console.log(req.body)
    const IsUpdated= await License.findOneAndUpdate(
                     {_id:req.body.UserId},
                    {
                        LicenseTest:req.body.LicenseTest
                    },
                    {returnNewDocument: true,useFindAndModify:false}
    ) 
    if(IsUpdated){
        res.send(200);
    }
   
});
router.post('/cnicsearch',async(req,res)=>{
    const {Cnic } =req.body;
    const validLicense=await License.findOne({Cnic:Cnic});
    res.send(validLicense);
})
module.exports=router;