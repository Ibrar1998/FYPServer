const cons = require('consolidate');
const express = require('express')

const router = express.Router()

const mongoose=require("mongoose");
const Post=mongoose.model("Register");


router.get("/register",async (req,res)=>{
  
        const posts=await Post.find({})
        res.send(posts)
    
})

router.post("/register",async (req,res)=>{

    console.log(req.body)
    
      

       const cnic=await Post.findOne({Cnic:req.body.Cnic});
       const email=await Post.findOne({Email:req.body.Email});
       if(cnic){
           res.send({
               message:'Cnic Already Exit!'
             
           })
           return
       }
       if(email){
        res.send({
            message:'Email Already Exit!'
        })
        return
    }
    else{
               const post=new Post();
    post.Email=req.body.Email;
   post.Cnic=req.body.Cnic;
    post.Username=req.body.Username;
    post.Password=req.body.Password;
    post.Role=req.body.Role;

    await post.save(); 
          res.send({
              message:'OK'
          });
    }   

         

         
 })
 
 router.get("/register/:id",async (req,res)=>{
            console.log(req.params.id)
            const post=await Post.findOne({_id:req.params.id});
            res.send(post);
 })

 
router.put("/register/:postid",async (req,res)=>{

    console.log(req.params.postid);
    await Post.findByIdAndUpdate({
        _id:req.params.postid},
        req.body,{
            new:true,
            runValidators:true,useFindAndModify:false
    })
    res.sendStatus(200);
})

 router.delete("/register/:postid",async (req,res)=>{

        console.log(req.params.postid);
         await Post.findByIdAndRemove({
            _id:req.params.postid
            
        },{useFindAndModify:false});
    
        res.sendStatus(200);
})










module.exports=router;