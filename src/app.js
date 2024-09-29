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
    const users =await User.find({emailId:userEmail});
    if(users.length===0){
      res.status(404 ).send("User not Found.. ")
    } else{ 
      res.send(users);
    }
  }
  catch(err) {
    res.status(400).send("Something went wrong");
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