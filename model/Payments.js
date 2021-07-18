const mongoose =require("mongoose");

const Payments =new  mongoose.Schema(
    {
        PayerId:{type:String,required:true },
        WardanId:{type:String,required:true },
        PayerName:{type:String,required:true },
        PayerCnic:{type:String,required:true },
        PayerEmail:{type:String,required:true },
        PaymentDate:{type: Date, default: Date.now()},
        PayerFine:{type:String,required:true },
    }

);

module.exports= mongoose.model("Payments", Payments);