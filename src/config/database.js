const  mongoose =  require("mongoose");
 


const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://balharabhisham:hEXaRJbwj3afl6oN@cluster0.7vefpjn.mongodb.net/devTinder"
    );
};
 module.exports = connectDB;
