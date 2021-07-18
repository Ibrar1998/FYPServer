const mongoose =require("mongoose");

const Vehicles =new  mongoose.Schema(
    {
        UserId:{
            type:String,
            required:true
        },
        Numberplate:{
            type:String,
            required:true
        },

      VehicleData:Object
}

);

module.exports= mongoose.model("Vehicles", Vehicles);