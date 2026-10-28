//Responsible for connecting to the database and starting the server.
require("dotenv").config();

 const app= require('./src/app');
const connectDB = require("./src/db/db");
const PORT = process.env.PORT || 5000;
 async function startserver(){
    
    await connectDB();
         app.listen(PORT, function () {
            console.log(`Server running on port ${PORT}`);
    }); 
 }

 startserver();