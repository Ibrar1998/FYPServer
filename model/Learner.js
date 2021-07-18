const mongoose =require("mongoose");

const Learner = new  mongoose.Schema(
    {
        UserId:{type:String,  required:true},
        LearnerImage:{type:String,  required:true},
        Cnic:{type:String,  required:true},
        Username:{type:String,  required:true},
        Fathername:{type:String,  required:true},
        DriverType:{type:String,  required:true},
        Vahicletype:{type:String,  required:true},
        Bloodgroup:{type:String},
        Nationality:{type:String,  required:true},
        Address:{type:String,  required:true},
        PassportNumber:{type:String},
        Dob:{type:String,  required:true},
        Gender:{type:String,  required:true},
        CitizenType:{type:String,  required:true},
        MobileNumber:{type:String,  required:true},
        Height:{type:String},
        LearnerAppleidDate: { type: Date, default: Date.now()}
}

);

module.exports= mongoose.model("Learner", Learner);