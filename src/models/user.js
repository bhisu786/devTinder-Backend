const mongoose =  require("mongoose");

const userSchema =  mongoose.Schema({
 
     
  firstName:{
    type: String
  },
  lastName:{
    type:String
  },
  emailId:{
    type:String
  },
  password:{
    type:String
  },
  age:{
    type:Number
  },
  gender:{
    type:String
  }

});

//const  userModel  = mongoose.model("user",userSchema);


//const User =  mongoose.model("User",userSchema);


//module.exports = userModel;

// or some programmers also use this method

 module.exports = mongoose.model("User",userSchema);
