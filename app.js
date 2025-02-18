const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

//  Routes
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);


// Connect to MongoDB
async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: process.env.DB_NAME,
      
    });
    console.log("MongoDB Connected!");

    // Start Server Only If DB Connects Successfully
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1); 
  }
}


process.on("SIGINT", async () => {
  console.log("Closing MongoDB connection...");
  await mongoose.connection.close();
  console.log("MongoDB Disconnected!");
  process.exit(0);
});


connectDb();
