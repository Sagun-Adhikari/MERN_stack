const mongoose = require('mongoose')

async function connectDB(){
try{
        await mongoose.connect(process.env.MONGO_URI)
    console.log("database connected")
}catch(error){
    console.log("database connection failed",error);
    
}
}

module.exports=connectDB;