//manage server
const express= require('express')
const cors=require('cors')
const userRoutes = require('./routes/userroutes');

const app=express();
app.use(express.json())
app.use(cors())
app.use('/api/users', userRoutes);

module.exports=app