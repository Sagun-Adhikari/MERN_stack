// This loads environment variables, connects to MongoDB, and starts the server only after the database connection succeeds.

require("dotenv").config();

const app = require("./app");
const connectDB = require("./db/connectDB");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, function () {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
