const mongoose =require("mongoose");


const Challan =new  mongoose.Schema(
    {
        WardanId:{type:String,  required:true},
        WardanName:{ type:String, required:true},
        RegNoOfVehicle:{type:String,required:true},
        OffenderName:{type:String,required:true},
        OffenderCnic:{type:String},
        Address:{type:String},
        ViolationCode:{type:String,required:true},
        Fine:{type:String,required:true},
        TrafficSectorName:{type:String,required:true},
        Status:{type:String,required:true},
        ChallanTime: { type: Date, default: Date.now()}
}

);

module.exports= mongoose.model("Challan", Challan);