const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Define routes
router.get('/', getAllProducts);
router.get('/:slug', getProductBySlug);
router.post('/', protect, createProduct);
router.post('/:id/images', protect, upload.single('image'), uploadProductImage);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
