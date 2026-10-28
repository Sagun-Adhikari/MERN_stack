//responsible for create ann manage the server
 const express=require('express')
 const cors= require('cors')
 const authRoutes = require("./routes/authRoutes");

 const app=express();//server created

 app.use(cors({
    origin: "http://localhost:5173"
 }));

 app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", function (req, res) {
    res.send("Authentication API is running");
});

module.exports=app