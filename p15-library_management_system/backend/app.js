const express= require('express')
const cors=require('cors')

const app= express()
app.use(cors())
app.use(express.json())


const bookRoutes = require("./routes/bookRoutes");
const memberRoutes = require("./routes/memberRoutes");
const borrowRoutes = require("./routes/borrowRoutes");

// Register routes
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/borrow", borrowRoutes);

module.exports=app;