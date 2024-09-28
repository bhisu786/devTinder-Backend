const mongoose =  require("mongoose");

const userSchema =  mongoose.Schema({
 
     
  firstName:{
    type:String
  },
  lastName:{
    type:string
  },
  emailId:{
    type:string
  },
  password:{
    type:string
  },
  age:{
    type:Number
  },
  gender:{
    type:string
  }

});

const  userModel  = mongoose.model("user",userSchema);

module.exports =userModel;