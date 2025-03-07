const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const runCronJobs = require("./cronjobs");

//all routes to database
const propertyRoutes = require("./routes/property.route");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//routes middleware
app.use("/api/properties", propertyRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB database for real estate connected");
    // runCronJobs();
  })
  .catch((error) => console.error("MongoDB connection error:", error));

//connect to server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
