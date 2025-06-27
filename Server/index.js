// Load environment variables
require("dotenv").config();

// Import core modules
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import router
const router = require("./routes");

// Connect to MongoDB
require("./connection");

// Initialize express app
const pfServer = express();

// Enable CORS for all requests
pfServer.use(cors());

// Parse incoming JSON requests
pfServer.use(express.json());

// Serve static files from uploads folder (important for accessing uploaded files)
pfServer.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use your defined routes
pfServer.use(router);

//Handle Multer or file upload errors gracefully
// const multer = require('multer');
// pfServer.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError || err.message.includes('Only .png')) {
//     return res.status(400).json({ message: err.message });
//   }
//   next(err);
// });

// Set server port
const PORT = process.env.PORT || 4000;

// Start the server
pfServer.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
