const express =  require('express');
const  connectDB  = require("./config/database");
const app = express();
const User = require("./models/user");


//------- first  api


app.use(express.json());

app.post("/signup",async(req,res)=>{

 // console.log(req.body);
 const user = new User(req.body);

// const userObj = {
//    firstName :"Bhisham",
//    lastName :"Balhara",
//    emailId:"bhishambalhara@gmail.com",
//    password:"bhisham@123",
// };
 
//  creating the instance of the user model
// const user = new User(userObj);


try{
  // this will return a promise and this save the data to the database
  await user.save();
  res.send("user added Successfully...")
}
catch(err){
  res.status(400).send("Error in Saving the  data  "+ err.message);
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