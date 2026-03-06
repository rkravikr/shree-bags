const multer = require('multer');

// Configure multer to use memory storage
// This is optimal for Cloudinary upload_stream as it avoids writing temp files to disk.
const storage = multer.memoryStorage();

// Multer upload middleware, expecting a single file field named 'image'
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
            return cb(new Error('Please upload an image file (jpg, jpeg, png, webp)'));
        }
        cb(undefined, true);
    },
});

module.exports = upload;
