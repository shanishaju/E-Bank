const multer = require("multer");
const path = require("path");

// Configure storage location and filename
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads"); // Ensure this folder exists
  },
  filename: (req, file, callback) => {
    const uniqueName = `image-${Date.now()}-${file.originalname}`;
    callback(null, uniqueName);
  },
});

// Filter file types (allow only image/jpeg, image/png, image/jpg)
const fileFilter = (req, file, callback) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("Only .png, .jpg and .jpeg formats are allowed"), false);
  }
};

// onfigure multer with the above settings
const multerConfig = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = multerConfig;
