const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// POST /admin/login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for admin email
        const admin = await prisma.admin.findUnique({ where: { email } });

        if (admin && (await bcrypt.compare(password, admin.password))) {
            res.json({
                id: admin.id,
                email: admin.email,
                token: generateToken(admin.id),
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error in admin login:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
};

// Utility endpoint to create first admin (can be removed or secured later)
// POST /admin/setup
const setupAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const adminExists = await prisma.admin.findUnique({ where: { email } });

        if (adminExists) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create admin
        const admin = await prisma.admin.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        if (admin) {
            res.status(201).json({
                id: admin.id,
                email: admin.email,
                token: generateToken(admin.id),
            });
        } else {
            res.status(400).json({ error: 'Invalid admin data' });
        }
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ error: 'Failed to create admin setup' });
    }
};

module.exports = {
    loginAdmin,
    setupAdmin,
};
