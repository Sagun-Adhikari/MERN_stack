//just open the server
const app=require('./app')
require('dotenv').config();
const connectDB=require('./db/db')


async function startserver(){
   await connectDB();
 const PORT = process.env.PORT || 5000;
   app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
 })
  
}
startserver();

