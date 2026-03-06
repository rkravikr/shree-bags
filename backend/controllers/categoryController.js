const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateSlug = require('../utils/generateSlug');

// GET /categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                products: true // Optional: depending on if we want to send products with categories
            }
        });
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

// POST /categories
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }

        const slug = generateSlug(name);

        // Check if category already exists
        const existingCategory = await prisma.category.findUnique({ where: { slug } });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        const category = await prisma.category.create({
            data: {
                name,
                slug
            }
        });

        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
};

// PUT /categories/:id
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }

        // Check if category exists
        const existingCategory = await prisma.category.findUnique({ where: { id: parseInt(id) } });
        if (!existingCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const slug = generateSlug(name);

        // Check if new slug already exists for a DIFFERENT category
        const duplicateSlug = await prisma.category.findUnique({ where: { slug } });
        if (duplicateSlug && duplicateSlug.id !== parseInt(id)) {
            return res.status(400).json({ error: 'Category with similar name already exists' });
        }

        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(id) },
            data: {
                name,
                slug
            }
        });

        res.json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Failed to update category' });
    }
};

// DELETE /categories/:id
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if category exists
        const existingCategory = await prisma.category.findUnique({ where: { id: parseInt(id) } });
        if (!existingCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Check if any products are using this category
        const productsCount = await prisma.product.count({
            where: { categoryId: parseInt(id) }
        });

        if (productsCount > 0) {
            return res.status(400).json({ error: `Cannot delete category. ${productsCount} products are still associated with it.` })
        }

        await prisma.category.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
