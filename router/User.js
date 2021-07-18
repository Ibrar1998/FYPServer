
const express = require('express')

const router = express.Router()
const mongoose=require("mongoose");
const Learner=mongoose.model("Learner");

const multer=require('multer');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./userImage/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload=multer({storage:storage});


router.post('/learner',upload.single('userimage'),async(req,res)=>{
    console.log(req.file)
    console.log(req.body);
      
        const learner =new Learner();
        learner.UserId=req.body.UserID;
        learner.LearnerImage=req.file.filename;
        learner.Cnic=req.body.Cnic;
        learner.Username=req.body.Name;
        learner.Fathername=req.body.Fathername;
        learner.DriverType=req.body.DriverType;
        learner.Vahicletype=req.body.VehType;
        learner.Bloodgroup=req.body.BloodGropup;
        learner.Nationality=req.body.Nationality;
        learner.Address=req.body.Address;
        learner.PassportNumber=req.body.PassPortNum;
        learner.Dob=req.body.Dob;
        learner.Gender=req.body.Gender;
        learner.CitizenType=req.body.CitizenType;
        learner.MobileNumber=req.body.PhoneNum;
        learner.Height=req.body.Height;

        await learner.save();
        res.send(200);
})
router.get('/:learnerId',async(req,res)=>{
    console.log(req.params.learnerId);
    const validleaner=await Learner.findOne({UserId:req.params.learnerId});
    res.send(validleaner);
});
router.get('/',async(req,res)=>{
    const validleaner=await Learner.find({});
    res.send(validleaner);
});


module.exports=router;