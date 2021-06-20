const mongoose =require("mongoose");
const mongodbErrorHandler = require('mongoose-mongodb-errors');
mongoose.Promise=global.Promise;

mongoose.plugin(mongodbErrorHandler);
mongoose.connect("mongodb://localhost:27017/TrafficAppDb",{ useNewUrlParser: true,useUnifiedTopology: true  });