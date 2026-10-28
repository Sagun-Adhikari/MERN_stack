//just open the server
const app=require('./app')
const connectDB=require('./db/db')
require('dotenv').config();

const PORT= process.env.PORT || 5000;
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
}

startServer();