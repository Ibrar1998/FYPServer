const express = require('express');
const { createWorker ,PSM, OEM } =require('tesseract.js');
const router = express.Router();
const mongoose=require("mongoose");
const Verify=mongoose.model("Vehicles");
const multer=require('multer');
const { json } = require('body-parser');
const { stringify } = require('uuid');
const JSONTransport = require('nodemailer/lib/json-transport');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload=multer({storage:storage});


router.post('/upload',upload.single('file'),(req,res)=>{

    console.log(req.file);
    const path= './uploads/'+req.file.originalname;
    console.log(path);
  
  
    const worker = createWorker({
        logger: m => console.log(m)
      });
       
      (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');  
        await worker.setParameters({  
            tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789-',
            tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
            tessedit_pageseg_mode: PSM.SPARSE_TEXT,
          });          //+req.file.filename
        const { data: { text } } = await worker.recognize(path);
     
       // searching start 
       
       var test = text.replace(/(\r\n|\n|\r)/gm,"");  
       console.log(text)
       const vehicles=await Verify.findOne(      
        {  
           //  Numberplate:test
           Numberplate : {$regex: (test),$options:"$i" } 
        })
      
        if(vehicles){
            console.log(vehicles)
        res.send(vehicles);
        }else{
            res.send({
                message:'Vehicle NOT FOUND'
            })
        }


     
        
        await worker.terminate();
      })();  
}); 



module.exports=router;
