const mongoose= require('mongoose')
require('dotenv').config();


async function connectDB(){
     await mongoose.connect(process.env.MONGO_URI)
    console.log("db connected successfully");
    
}

module.exports=connectDB;
