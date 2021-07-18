const mongoose =require("mongoose");
const mongodbErrorHandler = require('mongoose-mongodb-errors');
mongoose.Promise=global.Promise;

mongoose.plugin(mongodbErrorHandler);
//  mongoose.connect("mongodb://localhost:27017/TrafficAppDb",{ useNewUrlParser: true,useUnifiedTopology: true  })
//  .then(() => console.log( 'Database Connected' ));

mongoose.connect("mongodb+srv://Ibrar__Gill:mongodb123@cluster0.nbpd8.mongodb.net/TrafficAppDb?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true  })
.then(() => console.log( 'Database Connected' ));