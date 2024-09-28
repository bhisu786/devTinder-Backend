// handle auth middlewares for all get  request get post 


 const adminAuth=("/admin",(req,res,next)=> {
    console.log("Admin auth is getting checked!!!");
    const token ="xyz";
    const isAdminAuthorized= token ==="xyz";
    if(!isAdminAuthorized) {
       res.status(401).send("UnAuthorised Request");
    }  else{
       next(); 
    }
 });

 const userAuth=("/admin",(req,res,next)=> {
   console.log("Admin auth is getting checked!!!");
   const token ="xyz";
   const isAdminAuthorized= token ==="xyz";
   if(!isAdminAuthorized) {
      res.status(401).send("UnAuthorised Request");
   }  else{
      next(); 
   }
});
 
 module.exports = {
   adminAuth,userAuth
 };