const express= require('express')
const app=require('./app')
require('dotenv').config()
const connectDB=require('./db/db')

async  function startserver(){
    await connectDB();
    PORT=process.env.PORT || 5000;
    app.listen(PORT,()=>{
        console.log(`server started at ${PORT}`);
        
    })
}
startserver();