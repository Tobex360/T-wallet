const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/') // Make sure this folder exists!
  },
  filename: function (req, file, cb) {
    // Create unique filename: timestamp + original name
    cb(null, Date.now() + '-' + file.originalname)
  }
});

// File filter (allow all image types)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb('Error: Only image files are allowed!');
  }
};

// Create upload instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: fileFilter
});

module.exports = upload;