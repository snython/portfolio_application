const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const contactRoutes = require("../../routes/contactRoutes");
const userRoutes = require("../../routes/userRoutes");

const app = express();
dotenv.config();

// Connect to mongo db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("Error connecting to mongodb:", error);
  });

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to My Portfolio Application",
  });
});

// Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Export the serverless-wrapped app
module.exports.handler = serverless(app);

