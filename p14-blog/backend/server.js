//only responsible for start server
const app= require('./app')
require('dotenv').config();
const connectDB=require('./db/db')

PORT=process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`server started at port ${PORT}`)
})
connectDB();