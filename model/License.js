const mongoose =require("mongoose");

const License = new  mongoose.Schema(
    {
        UserId:{type:String,  required:true},
        LicenseInfo:Object,
        Status:{type:String, required:true},
        LicenseTest:{type:String},
        Cnic:{type:String, required:true},
        LicenseAppleidDate: { type: Date, default: Date.now()}
}
);

module.exports= mongoose.model("License", License);