const mongoose =require("mongoose");

const FeedbackandCompailent =new  mongoose.Schema(
    {
        id:{
            type:String,
            required:true
        },

      Feedbacks:[Object],

      Complaints:[ Object ]
       
      
}

);

module.exports= mongoose.model("FeedbackandCompailent", FeedbackandCompailent);