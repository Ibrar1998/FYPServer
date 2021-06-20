

const express = require('express')
const router = express.Router()

const mongoose=require("mongoose");

const User=mongoose.model("Register");
const AddVehicle=mongoose.model("Vehicles");
//
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


router.post("/",upload.single('userimage'), async(req,res)=>{
    
   
    console.log(req.body);
  
            
         const validuser= await User.findOne({_id:req.body.id}) 
            if(validuser){

                if(req.file!=undefined){
                    console.log('file exit');
                    console.log(req.file);
                    await  User.findOneAndUpdate(
                        {_id:req.body.id},
                        {
                             UserImage:req.file.filename
                        },
                        {returnNewDocument: true,useFindAndModify:false}
                    )
                }
                await  User.findOneAndUpdate(
                    {_id:req.body.id},
                    {
                        PersonalData:req.body
                    },
                    {returnNewDocument: true,useFindAndModify:false}
                )   

                res.send(200);
            }else{
                res.send(500);
            }   

});

//
router.post('/registerVehicles',async(req,res)=>{

    console.log(req.body);
    const Vehicle=new AddVehicle();
    const validuser= await User.findOne({_id:req.body.UserId}) 
    if(validuser){
        Vehicle.UserId=req.body.UserId
        Vehicle.Numberplate=req.body.Numberplate
        Vehicle.VehicleData= req.body 
        await Vehicle.save(); 
        res.send(200);
    }else{
        res.send(500);
    }  
});

router.post('/getVehicles',async(req,res)=>{

    const vehicles=await AddVehicle.find({UserId:req.body.UserId})
    res.send(vehicles)
})
//
module.exports=router;