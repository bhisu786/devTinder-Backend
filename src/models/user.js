const mongoose =  require("mongoose");
const validator = require("validator");




const userSchema =  mongoose.Schema({
 
  firstName:{
    type: String,
    required:true,
  },
  lastName:{
    type:String
  },
  emailId:{
    type:String,
    lowercase:true,
    required:true,
    unique:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invalid Email Address :" + value);
      }
    } ,
  },
  password:{
    type:String,
    required:true,
  },
  age:{
    type:Number,
    min:18,
  },
  gender:{
    type:String,
    validate(value){
      if(!["male","female","others"].include(value)) {
        throw new Error("Gender is not defined ");
      }
    }
  },
  // photoUrl:{
  //   type:String,
  //   default:"",
  //   validate(value){
  //     if(!validator.isURL(value)){
  //       throw new Error("invalid url Address :" + value);
  //     }
  //   } ,

  // },
  about:{
    type:String,
    default:"This is the default about the user",
  },
  skills:{
    type:[String],
  }

});

//const  userModel  = mongoose.model("user",userSchema);


//const User =  mongoose.model("User",userSchema);


//module.exports = userModel;

// or some programmers also use this method

 module.exports = mongoose.model("User",userSchema);
