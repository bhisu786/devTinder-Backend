const express =  require('express');

const app = express();



// request Handler
app.use("/",(req,res)=> {
   res.send("HomePage ");
});

app.use("/test",(req,res)=> {
    res.send("Hello from the test ");
 });
 

 app.use("/hello",(req,res)=> {
    res.send("Hello from the Server");
 });

 
 app.use("/",(req,res)=> {
    res.send("Hello from the Server");
 });
 

app.listen(3000,()=>{
    console.log("Server connected ");
});
