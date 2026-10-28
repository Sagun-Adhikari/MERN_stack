//only responsible for open and close server 
//aso for db connection
const app=require('./app');
const connectDB=require('./db/db')

require('dotenv').config();
const PORT=process.env.PORT || 5000;
connectDB();
app.listen(PORT,function(){
    console.log(`server started at port ${PORT}`);
    
})