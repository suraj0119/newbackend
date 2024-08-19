const multer = require('multer');
const path = require('path');

// Define storage location and filename format
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // File name format
  },
});

// Create the upload instance
const upload = multer({ storage });

module.exports = upload;
