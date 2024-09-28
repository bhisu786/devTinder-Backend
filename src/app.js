const express =  require('express');
const  connectDB  = require("./config/database");
const app = express();




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
