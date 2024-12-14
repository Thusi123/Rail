const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Import routes
const stationRoutes = require("./routes/stations");
const trainRoutes = require("./routes/trains");

// Use routes
app.use("/api/stations", stationRoutes);
app.use("/api/trains", trainRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
