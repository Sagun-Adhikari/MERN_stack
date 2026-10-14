//used to create server
const express= require('express')
const cors=require('cors')
const app = express();



app.use(
  cors({//cors is used to  make the server and forntend run at single loclhost
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", function(req,res){
    res.send("student management system is running")
})
app.get("/api/health", function (req, res) {
  res.status(200).json({
    success: true,
    message: "Backend is working",
  });
});
module.exports = app;