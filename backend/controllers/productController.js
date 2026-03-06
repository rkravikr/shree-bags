const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateSlug = require('../utils/generateSlug');
const cloudinary = require('../config/cloudinary');

// GET /products
const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                images: true,
            },
        });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// GET /products/:slug
const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
                images: true,
            },
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// POST /products
const createProduct = async (req, res) => {
    try {
        const { name, description, material, price, stock, categoryId, isActive } = req.body;

        // Validate required fields
        if (!name || !description || price === undefined || !categoryId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const slug = generateSlug(name);

        // Check if slug already exists
        const existingProduct = await prisma.product.findUnique({ where: { slug } });
        if (existingProduct) {
            return res.status(400).json({ error: 'Product with similar name already exists' });
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                slug,
                description,
                material: material || null,
                price: parseFloat(price),
                stock: stock !== undefined ? parseInt(stock) : null,
                categoryId: parseInt(categoryId),
                isActive: isActive !== undefined ? isActive : true,
            },
            include: {
                category: true,
                images: true
            }
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

// PUT /products/:id
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, material, price, stock, categoryId, isActive } = req.body;

        // Check if product exists first
        const existingProduct = await prisma.product.findUnique({ where: { id: parseInt(id) } });
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        let slug = existingProduct.slug;
        if (name && name !== existingProduct.name) {
            slug = generateSlug(name);
            // check if updated slug already exists
            const duplicateSlug = await prisma.product.findUnique({ where: { slug } });
            if (duplicateSlug && duplicateSlug.id !== parseInt(id)) {
                return res.status(400).json({ error: 'Product with similar name already exists' });
            }
        }

        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name: name || undefined,
                slug,
                description: description || undefined,
                material: material !== undefined ? material : undefined,
                price: price !== undefined ? parseFloat(price) : undefined,
                stock: stock !== undefined ? parseInt(stock) : undefined,
                categoryId: categoryId ? parseInt(categoryId) : undefined,
                isActive: isActive !== undefined ? isActive : undefined,
            },
            include: {
                category: true,
                images: true
            }
        });

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// DELETE /products/:id
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if product exists
        const existingProduct = await prisma.product.findUnique({ where: { id: parseInt(id) } });
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete associated images first to avoid foreign key violations
        await prisma.productImage.deleteMany({
            where: { productId: parseInt(id) }
        });

        await prisma.product.delete({
            where: { id: parseInt(id) },
        });

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

// POST /products/:id/images
const uploadProductImage = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if product exists
        const existingProduct = await prisma.product.findUnique({ where: { id: parseInt(id) } });
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a file' });
        }

        // Wrap Cloudinary's upload stream in a Promise so we can await it
        const uploadStream = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'shree_bags_products' },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                stream.end(req.file.buffer);
            });
        };

        const cloudinaryResult = await uploadStream();

        // Save image URL to database
        const newImage = await prisma.productImage.create({
            data: {
                url: cloudinaryResult.secure_url,
                productId: parseInt(id),
            },
        });

        res.status(201).json(newImage);
    } catch (error) {
        console.error('Error uploading product image:', error);
        res.status(500).json({ error: error.message || 'Failed to upload image' });
    }
};

module.exports = {
    getAllProducts,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
};
