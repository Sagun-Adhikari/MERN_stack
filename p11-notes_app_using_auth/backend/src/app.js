//Responsible for Express configuration and middleware
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app= express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);



module.exports=app;
