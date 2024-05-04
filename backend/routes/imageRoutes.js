const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer configuration for storing images in a folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
  },
});

// Create multer instance
const upload = multer({ storage: storage });

// Route for handling image uploads
router.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = "/images/" + req.file.filename; // Get the path to the uploaded image
  res.json({ imageUrl });
});

module.exports = router;
