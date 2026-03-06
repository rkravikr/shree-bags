const express = require('express');
const router = express.Router();
const { loginAdmin, setupAdmin } = require('../controllers/adminController');

router.post('/login', loginAdmin);
router.post('/setup', setupAdmin); // Temporary route to create the initial admin

module.exports = router;
