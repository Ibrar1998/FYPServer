
const express = require('express')
const fetch = require("node-fetch");
const router = express.Router()
const mongoose=require("mongoose");
const Learner=mongoose.model("Learner");
const crypto = require('crypto');
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
        learner.Vahicletype=req.body.VehType;
        learner.Bloodgroup=req.body.BloodGropup;
        learner.Address=req.body.Address;
        learner.PassportNumber=req.body.PassPortNum;
        learner.Dob=req.body.Dob;
        learner.Gender=req.body.Gender;
        learner.CitizenType=req.body.CitizenType;
        learner.MobileNumber=req.body.PhoneNum;
        

        await learner.save();
        res.send(200);
})
router.get('/:learnerId',async(req,res)=>{
    console.log(req.params.learnerId);
    const validleaner=await Learner.find({UserId:req.params.learnerId});
    if(validleaner){
        res.send(validleaner);
    }else{
        res.send({
            message:'Not Found'
        })
    }
    
});
router.get('/',async(req,res)=>{
    const validleaner=await Learner.find({});
    res.send(validleaner);
});

router.post('/jazzcash',async(req,res)=>{

        const {Mobile_Number} =req.body
     function pad2(n) { return n < 10 ? '0' + n : n }
          var date = new Date();
  
          const dateandtime = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate()) + pad2( date.getHours() ) + pad2( date.getMinutes() ) + pad2( date.getSeconds() )
          const dexpiredate = date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2( date.getDate()+1) + pad2( date.getHours() ) + pad2( date.getMinutes() ) + pad2( date.getSeconds() )
      
       
          const tre = "T"+dateandtime;
          console.log(tre,dexpiredate);
          const pp_Amount="20000";
          const pp_BillReference="billRef";
          const pp_Description="Description";
          const pp_Language="EN";
          const pp_MerchantID="MC22674";
          const pp_Password="v3y01y32yx";
      
          const pp_ReturnURL="https://islambadtrafficpolice.herokuapp.com/PayChallan";
          const pp_ver = "1.1";
          const pp_TxnCurrency= "PKR";
          const pp_TxnDateTime=dateandtime.toString();
          const pp_TxnExpiryDateTime=dexpiredate.toString();
          const pp_TxnRefNo=tre.toString();
          const pp_TxnType="MWALLET";
          const ppmpf_1=Mobile_Number;
          const IntegeritySalt = "3wt1f5ef9z";
         
         
          const and = '&';
          const superdata=
          IntegeritySalt+and+
                  pp_Amount+and+
                  pp_BillReference +and+
                  pp_Description +and+
                  pp_Language +and+
                  pp_MerchantID +and+
                  pp_Password +and+
                  pp_ReturnURL +and+
                  pp_TxnCurrency+and+
                  pp_TxnDateTime +and+
                  pp_TxnExpiryDateTime +and+
                  pp_TxnRefNo+and+
                  pp_TxnType+and+
                  pp_ver+and+
                  ppmpf_1
          ;
           var hmac256 = crypto.createHmac('sha256', IntegeritySalt)
          .update(superdata)
          .digest('hex')
          .toUpperCase()
       //   console.log(hmac256,pp_TxnDateTime,pp_TxnExpiryDateTime,pp_TxnRefNo)
      await fetch('https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction',{
           method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "pp_Version": pp_ver,
            "pp_TxnType": pp_TxnType,
            "pp_Language": pp_Language,
            "pp_MerchantID": pp_MerchantID,
            "pp_Password": pp_Password,
            "pp_TxnRefNo": tre,
            "pp_Amount": pp_Amount,
            "pp_TxnCurrency": pp_TxnCurrency,
            "pp_TxnDateTime": dateandtime,
            "pp_BillReference": pp_BillReference,
            "pp_Description": pp_Description,
            "pp_TxnExpiryDateTime":dexpiredate,
            "pp_ReturnURL": pp_ReturnURL,
            "pp_SecureHash": hmac256.toString(),
            "ppmpf_1":ppmpf_1
            })
       }
      

       )
       .then(response=>{
        console.log(response.status);
        res.send(response.body);
       }).catch(err=>{
        console.log(err);
        res.send(400);
       })
      
})




module.exports=router;