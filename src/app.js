const express =  require('express');
const  connectDB  = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} =  require("./utlis/validation");
const bcrypt = require("bcrypt");


//------- first  api-
app.use(express.json());

app.post("/signup",async(req,res)=>{
try{
  // validation of data 
validateSignUpData(req);

const {firstName,lastName,emailId,password} = req.body;
// Encrypt the password
  const passwordHash = await bcrypt.hash(password,10);
  console.log(passwordHash);

//  creating the instance of the user model
 // const user = new User(userObj);
 //  console.log(req.body);
 const user = new User({
  firstName,
  lastName,
  emailId,
  password:passwordHash,
 });



  // this will return a promise and this save the data to the database
  await user.save();
  res.send("user added Successfully...")
}
catch(err){
  res.status(400).send("Error : "+ err.message);
}


});


app.post("/login",async(req,res)=>{
  try{
 
     const {emailId,password} =req.body;
     
     const user = await User.findOne({emailId:emailId});
     if(!user) {
      throw new Error("Invalid credentials");
     }

  const  isPasswordValid =  await bcrypt.compare(password,user.password);

  if(isPasswordValid){
    res.send("login Successfull!!!!!!!");
  }else{
    throw new Error("Invalid credentials");
  }


  }catch(err){
    res.status(400).send("ERROR"+err.message); 
  }
});


// //GET THE USER BY Gmail
// app.get("/user",async(req,res)=>{
//   const userEmail = req.body.emailId;

//   try{
//     const users =await User.find({emailId:userEmail});
//     res.send(users);
//   }
//   catch(err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// get the email by gmail

app.get("/user",async(req,res)=>{
  const userEmail = req.body.emailId;

  try{
    const user= await User.findOne({emailId:userEmail});
    if(!user) {
      res.status(404 ).send("User not Found.. ");
    }else{
      res.send(user);
    }
         
    // const users =await User.find({emailId:userEmail});
    // if(users.length===0){
    //   res.status(404 ).send("User not Found.. ")
    // } else{ 
    //   res.send(users);
    // }
  }
  catch(err) {
    res.status(400).send("Something went wrong");
  }
});


//delete api

app.delete("/user",async(req,res)=>{
  const userId =  req.body.userId;

  try{
    const user =  await User.findByIdAndDelete({_id:userId});
  
    // res.send("user deleted successfully");
    if(!userId){
      res.status(400).send("User Is Not Find..")
    }else{
      res.send("User Deleted Successfully");
    }
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }
});


// UPDATE THE DATA THROUGH THA API'S

app.patch ("/user",async(req,res)=>{
    const  user =  User.findByIdAndUpdate("");
    try { 
    if(!user) {
      res.status(400).send("User details are Wrong")
    } else{
      res.send("user details updated successfully");
    } 
  }
    catch(err){
      res.status(400).send("Something Went Wrong...")
    }
});


app.patch("/user:userId",async(req,res) =>{ 
  //  const userId = req.body.userId;
  //  const data =  req.body;
  const userId = req.params?.userId;

   try {
    const ALLOWED_UPDATES =[
      "userId","photoUrl","about","gender","age",
      "skills",
       ];
  
      const isUpdateAllowed =  Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
    );
  
    if(!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }
    if(data?.skills.length>10) {
      throw new   Error("skills can not be more than 10");
    }
    const user = await User.findByIdAndDelete({_id:userId},data, {
      returnDocument:"after",
      runValidators:true,
    });
    console.log(user);

    res.send("User Update Suceessfully");
   }catch(err){
    res.status(400).send("UPDATE FAILED" + err.message);
   }
});

//------------------------
connectDB()
   .then(()=>{
    console.log("DB Connected Successfully....❤️ ");
    app.listen(3000,()=>{
      console.log("Server connected ");
  });
  
})
   .catch(err=>{
    console.log("DB Connection Failed...????")
   })