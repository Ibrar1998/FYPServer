const mongoose =require("mongoose");

const Register =new  mongoose.Schema(
    {
        Email:{
            type:String,
            required:true
        },
        Cnic:{
            type:String,
            required:true
        },
        Username:{
            type:String,
            required:true
        },
        Password:{
            type:String,
            required:true
        },
        Role:{
            type:String,
            required:true
        }
        ,
        UserImage:String,
        PersonalData:Object

}

);

module.exports= mongoose.model("Register", Register);