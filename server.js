const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
